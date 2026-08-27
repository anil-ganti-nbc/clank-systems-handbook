/**
 * Optional DAU Practice Labs seam. The Handbook never assigns mastery/SRS.
 * If launched with ?practice=, it can postMessage a lightweight result.
 */
export const HANDBOOK_LAB_ID = "clank-systems-handbook";

export function readPracticeLaunch(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("practice");
  if (!raw) return null;
  try {
    const normalized = raw.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(normalized + "=".repeat((4 - (normalized.length % 4)) % 4));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function emitPracticeResult(input: {
  conceptId: string;
  lessonId: string;
  completed: boolean;
  timeSpentMs: number;
  metadata?: Record<string, string | number | boolean | null>;
}) {
  const result = {
    schemaVersion: 1,
    labId: HANDBOOK_LAB_ID,
    conceptId: input.conceptId,
    lessonId: input.lessonId,
    completed: input.completed,
    attempts: 1,
    timeSpentMs: input.timeSpentMs,
    metadata: input.metadata,
  };
  if (typeof window !== "undefined" && window.opener) {
    window.opener.postMessage({ type: "dau:practice-result", result }, "*");
  }
  return result;
}
