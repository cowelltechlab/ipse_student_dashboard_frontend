import apiClient from "../../services/apiClient";

// hooks/useAssignmentStreamSections.ts
import { useCallback, useMemo, useRef, useState } from "react";

type SectionKey =
  | "assignmentInstructionsHtml"
  | "stepByStepPlanHtml"
  | "myPlanChecklistHtml"
  | "motivationalMessageHtml"
  | "promptsHtml"
  | "supportTools"
  | "template";

type SectionsState = {
  assignmentInstructionsHtml?: string;
  stepByStepPlanHtml?: string;
  myPlanChecklistHtml?: string;
  motivationalMessageHtml?: string;
  promptsHtml?: string;
  // Optional nested structures when they appear
  supportTools?: {
    toolsHtml: string;
    aiPromptingHtml?: string;
    aiPolicyHtml: string;
  };
  template?: {
    title: string;
    bodyHtml: string;
  };
};

function parseEventBlocks(buffer: string): { blocks: string[]; rest: string } {
  // SSE messages are separated by a blank line
  // Handle both \n\n and \r\n\r\n and the possibility of partial chunks
  const delimiter = /\r?\n\r?\n/;
  const parts = buffer.split(delimiter);
  // If the buffer ends with delimiter, the last part is "", which is a full block end.
  // If not, the last part is an incomplete remainder.
  const rest = parts.pop() ?? "";
  return { blocks: parts, rest };
}

export function useAssignmentStreamSections() {
  const [sections, setSections] = useState<SectionsState>({});
  const [rawLog, setRawLog] = useState<string>(""); // optional: for debugging/visibility
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setSections({});
    setRawLog("");
    setError(null);
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const start = useCallback(
    async (
      assignmentId: string,
      selectedOptions: string[],
      additionalIdeas: string
    ) => {
      reset();
      setIsLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(
          `${apiClient.defaults.baseURL}assignment-generation/${assignmentId}/stream`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "text/event-stream",
              Authorization: `Bearer ${
                localStorage.getItem("authToken") ?? ""
              }`,
            },
            body: JSON.stringify({
              selected_options: selectedOptions,
              additional_edit_suggestions: additionalIdeas ?? "",
            }),
            signal: controller.signal,
          }
        );

        if (res.status < 200 || res.status >= 300 || !res.body)
          throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          setRawLog((prev) => prev + decoder.decode(value, { stream: false })); // optional

          // Extract complete SSE event blocks
          const { blocks, rest } = parseEventBlocks(buffer);
          buffer = rest;

          for (const block of blocks) {
            // A block has lines like "event: section" and "data: {...}"
            // There can be multiple data: lines; here we assume one.
            let eventType: string | null = null;
            let dataJson = "";

            for (const line of block.split(/\r?\n/)) {
              if (line.startsWith("event:")) {
                eventType = line.slice(6).trim();
              } else if (line.startsWith("data:")) {
                // everything after "data:" (trim left space)
                dataJson += line.slice(5).trim();
              }
            }

            if (!eventType) continue;

            if (eventType === "section") {
              // { "key": "...", "html": "..." } OR nested payloads if needed
              const payload = JSON.parse(dataJson) as
                | {
                    key: Exclude<SectionKey, "supportTools" | "template">;
                    html: string;
                  }
                | {
                    key: "supportTools";
                    toolsHtml: string;
                    aiPolicyHtml: string;
                    aiPromptingHtml?: string;
                  }
                | { key: "template"; title: string; bodyHtml: string };

              setSections((prev) => {
                if (payload.key === "supportTools") {
                  const { toolsHtml, aiPolicyHtml, aiPromptingHtml } = payload;
                  return {
                    ...prev,
                    supportTools: {
                      toolsHtml,
                      aiPolicyHtml,
                      ...(aiPromptingHtml ? { aiPromptingHtml } : {}),
                    },
                  };
                }
                if (payload.key === "template") {
                  const { title, bodyHtml } = payload;
                  return {
                    ...prev,
                    template: { title, bodyHtml },
                  };
                }
                // simple key -> html
                return { ...prev, [payload.key]: payload.html };
              });
            } else if (eventType === "complete") {
              // Optional: backend sends the full object; you can merge to be safe
              try {
                const doneObj = JSON.parse(dataJson) as {
                  object?: Partial<SectionsState> & Record<string, unknown>;
                };
                if (doneObj?.object) {
                  setSections((prev) => ({ ...prev, ...doneObj.object }));
                }
              } catch {
                // ignore
              }
              setIsLoading(false);
            } else if (eventType === "error") {
              try {
                const e = JSON.parse(dataJson);
                setError(e?.message ?? "Stream error");
              } catch {
                setError("Stream error");
              }
              setIsLoading(false);
            }
          }
        }
      } catch (e: unknown) {
        if (
          typeof e === "object" &&
          e !== null &&
          "name" in e &&
          (e as { name?: string }).name !== "AbortError"
        ) {
          setError((e as { message?: string }).message || "Stream failed");
        } else if (typeof e === "string") {
          setError(e);
        } else {
          setError("Stream failed");
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [reset]
  );

  return useMemo(
    () => ({ sections, isLoading, error, start, cancel, rawLog }),
    [sections, isLoading, error, start, cancel, rawLog]
  );
}
