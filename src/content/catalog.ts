import { CONCEPTS } from "./concepts.ts";
import { MODULES } from "./modules.ts";
import { INCIDENTS } from "./incidents.ts";
import { TIMELINE } from "./timeline.ts";
import { EXPLAIN_PROMPTS } from "./explain.ts";
import { HISTORY, PHASES } from "./history.ts";
import { LAWS } from "./laws.ts";
import { FLEET } from "./fleet.ts";
import { validateHandbook } from "../lib/handbook/validate.ts";

export { CONCEPTS, MODULES, INCIDENTS, TIMELINE, EXPLAIN_PROMPTS, HISTORY, PHASES, LAWS, FLEET };

export const HANDBOOK = {
  concepts: CONCEPTS,
  modules: MODULES,
  incidents: INCIDENTS,
  timeline: TIMELINE,
  prompts: EXPLAIN_PROMPTS,
  phases: PHASES,
  history: HISTORY,
  laws: LAWS,
  fleet: FLEET,
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

export function historyById(id: string) {
  return HISTORY.find((h) => h.id === id);
}

export function phaseById(id: string) {
  return PHASES.find((p) => p.id === id);
}

export function lawById(id: string) {
  return LAWS.find((l) => l.id === id);
}

export function fleetById(id: string) {
  return FLEET.find((c) => c.id === id);
}
