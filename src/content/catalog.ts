import type { HistoryEntry } from "../lib/handbook/schema.ts";
import { CONCEPTS as CONCEPTS_V01 } from "./concepts.ts";
import { MODULES as MODULES_V01 } from "./modules.ts";
import { INCIDENTS as INCIDENTS_V01 } from "./incidents.ts";
import { TIMELINE as TIMELINE_V01 } from "./timeline.ts";
import { EXPLAIN_PROMPTS as EXPLAIN_V01 } from "./explain.ts";
import { HISTORY as HISTORY_V01, PHASES as PHASES_V01 } from "./history.ts";
import { LAWS } from "./laws.ts";
import { FLEET } from "./fleet.ts";
import { ARTEFACTS, EVIDENCE_GAPS as GAPS_V01, EVIDENCE_CAPTURE_UTC, LIVE_HOST_PROBE } from "./evidence.ts";
import { PROVENANCE as PROVENANCE_V01 } from "./provenance.ts";
import { LEDGER_REVIEWS as REVIEWS_V01 } from "./ledger-review.ts";
import { NEXT_STEPS as NEXT_V01, DO_NOT_DO_YET as DO_NOT_V01 } from "./next-steps.ts";
import { CONCEPTS_V02 } from "./v02/concepts.ts";
import { MODULES_V02 } from "./v02/modules.ts";
import { INCIDENTS_V02 } from "./v02/incidents.ts";
import { PHASES_V02, HISTORY_V02 } from "./v02/history.ts";
import { TIMELINE_V02 } from "./v02/timeline.ts";
import { EXPLAIN_V02 } from "./v02/explain.ts";
import { REVIEWS_V02 } from "./v02/reviews.ts";
import { NEXT_V02, DO_NOT_V02 } from "./v02/next-steps.ts";
import { GAPS_V02 } from "./v02/gaps.ts";
import { PROVENANCE_V02 } from "./v02/provenance.ts";
import { RESPONSIBILITIES } from "./v02/responsibilities.ts";
import { THEN_NOW } from "./v02/then-now.ts";
import { validateHandbook } from "../lib/handbook/validate.ts";

export const CONCEPTS = [...CONCEPTS_V01, ...CONCEPTS_V02];
export const MODULES = [...MODULES_V01, ...MODULES_V02];
export const INCIDENTS = [...INCIDENTS_V01, ...INCIDENTS_V02];
export const TIMELINE = [...TIMELINE_V01, ...TIMELINE_V02];
export const EXPLAIN_PROMPTS = [...EXPLAIN_V01, ...EXPLAIN_V02];
export const PHASES = [...PHASES_V01, ...PHASES_V02];
export const HISTORY = [...HISTORY_V01, ...HISTORY_V02];
export const LEDGER_REVIEWS = [...REVIEWS_V01, ...REVIEWS_V02];
export const NEXT_STEPS = [...NEXT_V01, ...NEXT_V02];
export const DO_NOT_DO_YET = [...DO_NOT_V01, ...DO_NOT_V02];
export const EVIDENCE_GAPS = [...GAPS_V01, ...GAPS_V02];
export const PROVENANCE = [...PROVENANCE_V01, ...PROVENANCE_V02];

export {
  LAWS,
  FLEET,
  ARTEFACTS,
  EVIDENCE_CAPTURE_UTC,
  LIVE_HOST_PROBE,
  RESPONSIBILITIES,
  THEN_NOW,
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
  responsibilities: RESPONSIBILITIES,
  thenNow: THEN_NOW,
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

export function responsibilityById(id: string) {
  return RESPONSIBILITIES.find((r) => r.id === id);
}

export const HISTORY_SYSTEMS = Array.from(new Set(HISTORY.flatMap((h) => h.systems))).sort();

export const V01_PHASE_IDS = [
  "p-origin",
  "p-portability",
  "p-expansion",
  "p-phase0",
  "p-motherclank",
  "p-scars",
  "p-continuity",
  "p-qc-onboard",
  "p-current",
] as const;

export const FAILURE_CLASS_OPTIONS = [
  { id: "materialization", label: "Materialization gap", incidentIds: ["inc-materialization"] },
  { id: "qc-masking", label: "Human QC masking automation failure", incidentIds: ["inc-qc"] },
  { id: "recall", label: "Coverage / recall (BANKAI)", incidentIds: ["inc-bankai"] },
  { id: "volume-loss", label: "Volume / database loss", incidentIds: ["inc-volume-loss"] },
  { id: "dual-scheduler", label: "Dual scheduler / stale launcher", incidentIds: ["inc-dual-scheduler"] },
  { id: "health-honesty", label: "Health honesty", incidentIds: ["inc-health-honesty"] },
  { id: "deployed-sha", label: "Deployed SHA mismatch", incidentIds: ["inc-deployed-sha"] },
  { id: "writer-lock", label: "Writer lock", incidentIds: ["inc-writer-lock"] },
  { id: "directory-sweep", label: "Directory sweep blast radius", incidentIds: ["inc-directory-sweep"] },
  { id: "historical-conformance", label: "Historical vs current conformance", incidentIds: ["inc-historical-conformance"] },
  { id: "live-deployment-proof", label: "Live deployment proof vs HEAD", incidentIds: ["inc-live-deployment-proof"] },
  { id: "process-exit", label: "Process exit mistaken for handoff", incidentIds: ["inc-process-exit-handoff"] },
  { id: "duplicate-checkout", label: "Duplicate checkout vs identity", incidentIds: ["inc-duplicate-checkout"] },
  { id: "reddit-admission", label: "Source admission / Reddit", incidentIds: ["inc-reddit-admission"] },
  { id: "editorial-usefulness", label: "Technical health vs editorial usefulness", incidentIds: ["inc-ledger-usefulness"] },
  { id: "schema-barrier", label: "Persistent-state compatibility barrier", incidentIds: ["inc-schema-barrier"] },
  { id: "resource-boundary", label: "Resource recommendation vs fleet authority", incidentIds: ["inc-quartermaster-boundary"] },
] as const;

export type FailureClassId = (typeof FAILURE_CLASS_OPTIONS)[number]["id"];

export function historyMatchesFailureClass(h: HistoryEntry, classId: string): boolean {
  const opt = FAILURE_CLASS_OPTIONS.find((o) => o.id === classId);
  if (!opt) return false;
  return h.incidentIds.some((id) => (opt.incidentIds as readonly string[]).includes(id));
}
