import { z } from "zod";

export const epistemicStatus = z.enum(["verified", "inferred", "illustrative", "incomplete"]);
export type EpistemicStatus = z.infer<typeof epistemicStatus>;

export const evidenceRefSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["repo", "commit", "file", "report", "doc", "log", "deployment"]),
  repo: z.string().optional(),
  sha: z.string().optional(),
  path: z.string().optional(),
  url: z.string().optional(),
  note: z.string(),
  status: epistemicStatus,
});
export type EvidenceRef = z.infer<typeof evidenceRefSchema>;

export const commitRefSchema = z.object({
  repo: z.string().min(1),
  sha: z.string().min(7),
  note: z.string().optional(),
});
export type CommitRef = z.infer<typeof commitRefSchema>;

export const conceptSchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1),
  definition: z.string().min(1),
  clankExample: z.string().min(1),
  explainToHuman: z.string().min(1),
  appearsIn: z.array(z.string()),
  related: z.array(z.string()),
});
export type Concept = z.infer<typeof conceptSchema>;

export const moduleSchema = z.object({
  id: z.string().min(1),
  area: z.enum(["built", "basics", "systems", "architecture", "history"]),
  title: z.string(),
  summary: z.string(),
  conceptIds: z.array(z.string()),
  sections: z.array(
    z.object({
      heading: z.string(),
      body: z.string(),
      conceptIds: z.array(z.string()).optional(),
    }),
  ),
});
export type Module = z.infer<typeof moduleSchema>;

export const incidentSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  dateRange: z.string(),
  systems: z.array(z.string()),
  complexity: z.enum(["simple-operational", "multi-layer", "mission-level"]),
  epistemic: epistemicStatus,
  symptom: z.string(),
  context: z.string(),
  competingHypotheses: z.array(z.string()),
  diagnosis: z.string(),
  rootCause: z.string(),
  contributingCauses: z.array(z.string()),
  causalChain: z.array(z.string()),
  blastRadius: z.string(),
  remediation: z.string(),
  verification: z.string(),
  residualRisk: z.string(),
  architecturalLesson: z.string(),
  evidence: z.array(evidenceRefSchema),
  conceptIds: z.array(z.string()),
  lawIds: z.array(z.string()).optional(),
  historyIds: z.array(z.string()).optional(),
  lab: z.boolean().optional(),
  probes: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      finding: z.string(),
      status: epistemicStatus,
    }),
  ),
});
export type Incident = z.infer<typeof incidentSchema>;

export const timelineEventSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  body: z.string(),
  status: epistemicStatus,
  conceptIds: z.array(z.string()),
  evidenceIds: z.array(z.string()),
  historyId: z.string().optional(),
  lawIds: z.array(z.string()).optional(),
});
export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const explainPromptSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  modelAnswer: z.string(),
  checklist: z.array(z.string()),
  conceptIds: z.array(z.string()),
});
export type ExplainPrompt = z.infer<typeof explainPromptSchema>;

export const historyPhaseSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  dateRange: z.string(),
  summary: z.string(),
  components: z.array(z.string()),
  responsibilities: z.string(),
  dataFlow: z.string(),
  scheduling: z.string(),
  storage: z.string(),
  alerting: z.string(),
  qc: z.string(),
  fleetSupervision: z.string(),
  whyThisLayer: z.string(),
  confidence: epistemicStatus,
});
export type HistoryPhase = z.infer<typeof historyPhaseSchema>;

export const historyEntrySchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  period: z.string(),
  phaseId: z.string(),
  systems: z.array(z.string()),
  event: z.string(),
  before: z.string(),
  change: z.string(),
  why: z.string(),
  evidence: z.array(evidenceRefSchema),
  commits: z.array(commitRefSchema),
  conceptIds: z.array(z.string()),
  lawIds: z.array(z.string()),
  incidentIds: z.array(z.string()),
  whatFailed: z.string().optional(),
  diagnosis: z.string().optional(),
  fix: z.string().optional(),
  verification: z.string().optional(),
  residualRisk: z.string().optional(),
  laterConsequence: z.string().optional(),
  confidence: epistemicStatus,
});
export type HistoryEntry = z.infer<typeof historyEntrySchema>;

export const fleetLawSchema = z.object({
  id: z.string().min(1),
  number: z.number(),
  title: z.string(),
  rule: z.string(),
  plainEnglish: z.string(),
  triggeringIncidentIds: z.array(z.string()),
  historyIds: z.array(z.string()),
  evidence: z.array(evidenceRefSchema),
  prevents: z.string(),
  cannotPrevent: z.string(),
  specimens: z.array(z.string()),
  deferred: z.boolean().optional(),
  conceptIds: z.array(z.string()),
});
export type FleetLaw = z.infer<typeof fleetLawSchema>;

export const fleetClankSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  purpose: z.string(),
  sources: z.string(),
  scheduling: z.string(),
  persistence: z.string(),
  host: z.string(),
  status: z.string(),
  limitation: z.string(),
  unresolved: z.string(),
  motherclank: z.string(),
  asOf: z.string(),
  confidence: epistemicStatus,
  staleNote: z.string().optional(),
});
export type FleetClank = z.infer<typeof fleetClankSchema>;
