import { CONCEPTS } from "./concepts.ts";
import { MODULES } from "./modules.ts";
import { INCIDENTS } from "./incidents.ts";
import { TIMELINE } from "./timeline.ts";
import { EXPLAIN_PROMPTS } from "./explain.ts";
import { HISTORY, PHASES } from "./history.ts";
import { LAWS } from "./laws.ts";
import { FLEET } from "./fleet.ts";
import { ARTEFACTS, EVIDENCE_GAPS, EVIDENCE_CAPTURE_UTC, LIVE_HOST_PROBE } from "./evidence.ts";
import { PROVENANCE } from "./provenance.ts";
import { LEDGER_REVIEWS } from "./ledger-review.ts";
import { NEXT_STEPS, DO_NOT_DO_YET } from "./next-steps.ts";
import { validateHandbook } from "../lib/handbook/validate.ts";

export {
  CONCEPTS,
  MODULES,
  INCIDENTS,
  TIMELINE,
  EXPLAIN_PROMPTS,
  HISTORY,
  PHASES,
  LAWS,
  FLEET,
  ARTEFACTS,
  EVIDENCE_GAPS,
  EVIDENCE_CAPTURE_UTC,
  LIVE_HOST_PROBE,
  PROVENANCE,
  LEDGER_REVIEWS,
  NEXT_STEPS,
  DO_NOT_DO_YET,
};

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
  artefacts: ARTEFACTS,
  gaps: EVIDENCE_GAPS,
  provenance: PROVENANCE,
  reviews: LEDGER_REVIEWS,
  nextSteps: NEXT_STEPS,
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

export function artefactById(id: string) {
  return ARTEFACTS.find((a) => a.id === id);
}

export const HISTORY_SYSTEMS = Array.from(new Set(HISTORY.flatMap((h) => h.systems))).sort();
