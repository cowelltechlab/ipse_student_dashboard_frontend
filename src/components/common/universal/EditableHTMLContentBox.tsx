import React, { useEffect, useRef, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  minHeightRem?: number; // default 8
  readOnly?: boolean; // default false
}

const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(({
  value,
  onChange,
  minHeightRem = 8,
  readOnly = false,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const isUpdatingFromProp = useRef(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const userActivityTimer = useRef<NodeJS.Timeout | null>(null);
  const immediateProtectionTimer = useRef<NodeJS.Timeout | null>(null);
  const isUserEditing = useRef(false);
  const isImmediatelyProtected = useRef(false);
  const lastPropUpdateTime = useRef<number>(0);

  // Normalize HTML for comparison to avoid minor formatting differences
  const normalizeHtml = useCallback((html: string) => {
    return html
      .replace(/\s+/g, ' ') // normalize whitespace
      .replace(/> </g, '><') // remove spaces between tags
      .trim();
  }, []);

  // Enhanced normalization that also handles ensureFragment transformation
  const normalizeForComparison = useCallback((html: string) => {
    const lower = html.toLowerCase();
    let normalized = html;

    // Apply the same logic as ensureFragment to ensure consistency
    if (
      lower.includes("<html") ||
      lower.includes("<body") ||
      lower.includes("<head") ||
      lower.includes("<!doctype")
    ) {
      const div = document.createElement("div");
      div.innerHTML = html;
      normalized = div.innerHTML;
    }

    return normalizeHtml(normalized);
  }, [normalizeHtml]);

  // Check if content changes are significant enough to warrant an update
  const isSignificantChange = useCallback((current: string, incoming: string) => {
    const normalizedCurrent = normalizeForComparison(current);
    const normalizedIncoming = normalizeForComparison(incoming || "");

    // If content is substantially different (not just minor formatting)
    if (normalizedCurrent !== normalizedIncoming) {
      const lengthDiff = Math.abs(normalizedCurrent.length - normalizedIncoming.length);
      // Only consider it significant if there's a meaningful difference in length
      // or if the content is empty (initial load)
      return lengthDiff > 10 || normalizedCurrent.trim() === "" || normalizedIncoming.trim() === "";
    }

    return false;
  }, [normalizeForComparison]);

  // Immediately protect user input from any prop updates
  const protectUserInput = useCallback(() => {
    isUserEditing.current = true;
    isImmediatelyProtected.current = true;

    // Clear existing timers
    if (userActivityTimer.current) {
      clearTimeout(userActivityTimer.current);
    }
    if (immediateProtectionTimer.current) {
      clearTimeout(immediateProtectionTimer.current);
    }

    // Immediate protection lasts 200ms - blocks ALL prop updates
    immediateProtectionTimer.current = setTimeout(() => {
      isImmediatelyProtected.current = false;
    }, 200);

    // Extended user editing state lasts 2 seconds
    userActivityTimer.current = setTimeout(() => {
      isUserEditing.current = false;
    }, 2000);
  }, []);

  // Keep Quill's document in sync with external value changes
  useEffect(() => {
    const quill = quillRef.current?.getEditor?.();
    if (!quill) return;

    const current = quill.root.innerHTML;
    const now = Date.now();

    // Check if this is a rapid sequence of prop updates (likely during generation)
    const isRapidUpdate = now - lastPropUpdateTime.current < 200;
    lastPropUpdateTime.current = now;

    // IMMEDIATE PROTECTION: Block ALL prop updates if user just interacted
    if (isImmediatelyProtected.current) {
      return;
    }

    // Don't update if user is actively editing, unless it's a significant change
    if (isUserEditing.current && !isSignificantChange(current, value)) {
      return;
    }

    // Only update if different and not currently updating from our own onChange
    if (isSignificantChange(current, value) && !isUpdatingFromProp.current) {
      // During rapid updates, be more conservative about overwriting user content
      if (isRapidUpdate && isUserEditing.current) {
        return;
      }

      // Save cursor position before updating
      const selection = quill.getSelection();

      isUpdatingFromProp.current = true;

      // "silent" avoids triggering onChange and causing loops
      quill.clipboard.dangerouslyPasteHTML(value || "", "silent");

      // Restore cursor position after DOM updates - but only if this editor has focus
      setTimeout(() => {
        // Check if this specific editor currently has focus before restoring cursor
        const hasFocus = quill.root.contains(document.activeElement);

        if (selection && hasFocus) {
          try {
            quill.setSelection(selection);
          } catch {
            // If the selection is invalid (e.g., beyond new content), place cursor at end
            const length = quill.getLength();
            quill.setSelection(length - 1);
          }
        }
        isUpdatingFromProp.current = false;
      }, 100); // Extended delay to prevent interference windows
    }
  }, [value, isSignificantChange]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (userActivityTimer.current) {
        clearTimeout(userActivityTimer.current);
      }
      if (immediateProtectionTimer.current) {
        clearTimeout(immediateProtectionTimer.current);
      }
    };
  }, []);

  return (
    <Box
      border={readOnly ? "1px solid #e2e8f0" : "1px solid #244d8a"}
      borderRadius="md"
      overflow="visible"
      className="rte"
      bg={readOnly ? "gray.50" : "white"}
      opacity={readOnly ? 0.8 : 1}
      style={{ "--rte-min-height": `${minHeightRem}rem` } as React.CSSProperties}
    >
      <ReactQuill
        ref={quillRef}
        value={value}
        // ReactQuill calls onChange(content, delta, source, editor)
        // Our handler's first arg will be the HTML string we want.
        onChange={(content) => {
          // Only call onChange if this isn't a programmatic update
          if (!isUpdatingFromProp.current) {
            // IMMEDIATELY protect this input from prop updates
            protectUserInput();

            // Debounce rapid changes to prevent infinite loops - reduced for responsiveness
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
              // Set flag briefly to prevent the useEffect from firing during the onChange
              isUpdatingFromProp.current = true;
              onChange(content);
              // Reset the flag after a short delay to allow parent component update
              setTimeout(() => {
                isUpdatingFromProp.current = false;
              }, 100); // Match the useEffect timing for consistency
            }, 20); // Faster response for better user experience
          }
        }}
        onChangeSelection={(selection, source) => {
          // Protect on any user-initiated selection change (typing, clicking, etc.)
          if (source === 'user') {
            protectUserInput();
          }
        }}
        onFocus={() => {
          // Protect immediately when user focuses this editor
          protectUserInput();
        }}
        readOnly={readOnly}
        theme="snow"
        style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
        modules={{
          toolbar: readOnly ? false : [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
          // prevent Quill from normalizing whitespace aggressively
          history: { delay: 300, maxStack: 100, userOnly: true },
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "list",
          "link",
          "blockquote",
          "code-block",
        ]}
      />
    </Box>
  );

}, (prevProps, nextProps) => {
  // Only re-render if these specific props have changed
  return (
    prevProps.value === nextProps.value &&
    prevProps.readOnly === nextProps.readOnly &&
    prevProps.minHeightRem === nextProps.minHeightRem &&
    prevProps.onChange === nextProps.onChange
  );
});

export default RichTextEditor;
