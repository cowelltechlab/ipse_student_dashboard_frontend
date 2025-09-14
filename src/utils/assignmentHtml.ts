// utils/assignmentHtml.ts
import type { AssignmentVersionData, FinalGeneratedJsonContent } from "../types/AssignmentVersionTypes";
import type { AssignmentJson } from "../components/assignmentModification/JsonAssignmentEditor";

/**
 * Build a single HTML string from the structured json_content.
 * Falls back to legacy html_content when present.
 */
export function buildModifiedHtml(version: AssignmentVersionData | null | undefined): string | null {
  if (!version?.final_generated_content) return null;

  const legacy = version.final_generated_content.html_content;
  if (legacy && legacy.trim()) return legacy; // old responses

  const json = version.final_generated_content.json_content;
  if (!json) return null;

  return combineSections(json);
}

/**
 * Optionally also combine the original assignment chunks if you later
 * want to render the “Original Assignment” from structured json.
 */
export function buildOriginalHtml(json?: FinalGeneratedJsonContent | null): string | null {
  if (!json) return null;
  return combineSections(json);
}

function combineSections(json: FinalGeneratedJsonContent): string {
  const parts: string[] = [];

  // order is up to you; this is a sensible default
  pushIf(parts, json.assignmentInstructionsHtml);
  pushIf(parts, json.stepByStepPlanHtml);
  pushIf(parts, json.promptsHtml);

  if (json.supportTools) {
    pushIf(parts, json.supportTools.toolsHtml);
    pushIf(parts, json.supportTools.aiPromptingHtml);
    pushIf(parts, json.supportTools.aiPolicyHtml);
  }

  pushIf(parts, json.motivationalMessageHtml);

  // Use a thin divider to separate major sections
  return parts.filter(Boolean).join('<hr style="margin:1rem 0; border:none; border-top:1px solid #e2e8f0;" />');
}

/**
 * Convert AssignmentJson to HTML string for preview display
 */
export function convertAssignmentJsonToHtml(json: AssignmentJson): string {
  const parts: string[] = [];

  // Order matches the editor sections
  pushIf(parts, json.assignmentInstructionsHtml);
  pushIf(parts, json.stepByStepPlanHtml);
  pushIf(parts, json.promptsHtml);

  if (json.supportTools) {
    pushIf(parts, json.supportTools.toolsHtml);
    pushIf(parts, json.supportTools.aiPromptingHtml);
    pushIf(parts, json.supportTools.aiPolicyHtml);
  }

  pushIf(parts, json.motivationalMessageHtml);

  // Use a thin divider to separate major sections
  return parts.filter(Boolean).join('<hr style="margin:1rem 0; border:none; border-top:1px solid #e2e8f0;" />');
}

function pushIf(arr: string[], maybeHtml?: string) {
  if (maybeHtml && maybeHtml.trim()) arr.push(maybeHtml.trim());
}
