import { CONCEPTS } from "./concepts.ts";
import { MODULES } from "./modules.ts";
import { INCIDENTS } from "./incidents.ts";
import { TIMELINE } from "./timeline.ts";
import { EXPLAIN_PROMPTS } from "./explain.ts";
import { validateHandbook } from "../lib/handbook/validate.ts";

export { CONCEPTS, MODULES, INCIDENTS, TIMELINE, EXPLAIN_PROMPTS };

export const HANDBOOK = {
  concepts: CONCEPTS,
  modules: MODULES,
  incidents: INCIDENTS,
  timeline: TIMELINE,
  prompts: EXPLAIN_PROMPTS,
};

export const HANDBOOK_ISSUES = validateHandbook(HANDBOOK);

export function conceptById(id: string) {
  return CONCEPTS.find((c) => c.id === id);
}

export function moduleById(id: string) {
  return MODULES.find((m) => m.id === id);
}

export function incidentById(id: string) {
  return INCIDENTS.find((i) => i.id === id);
}
