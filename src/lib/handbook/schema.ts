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
  before: z.string().optional(),
  failurePressure: z.string().optional(),
  newAbstraction: z.string().optional(),
  newRule: z.string().optional(),
  resultingArchitecture: z.string().optional(),
  unresolvedLimitations: z.string().optional(),
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

export const fleetLayerSchema = z.enum([
  "participant",
  "observation",
  "governance",
  "standards",
  "development-control",
  "resource",
  "editorial",
  "evidence-validation",
  "teaching",
  "historical",
  "local-probable",
]);
export type FleetLayer = z.infer<typeof fleetLayerSchema>;

export const fleetPresenceSchema = z.enum([
  "github",
  "local-only",
  "github-and-local",
  "historical",
  "absent-from-inventory",
]);
export type FleetPresence = z.infer<typeof fleetPresenceSchema>;

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
  inventorySha: z.string().min(1),
  inventoryAsOf: z.string().min(1),
  inventoryNote: z.string().optional(),
  repoHead: z.string().min(1),
  repoHeadAsOf: z.string().min(1),
  repoHeadNote: z.string().min(1),
  liveDeployedSha: z.string().min(1),
  historicallyProvenDeployedSha: z.string().optional(),
  historicallyProvenDeployedAsOf: z.string().optional(),
  historicallyProvenDeployedNote: z.string().optional(),
  layer: fleetLayerSchema.optional(),
  presence: fleetPresenceSchema.optional(),
  postV01: z.boolean().optional(),
  ownsQuestion: z.string().optional(),
  doesNotOwn: z.string().optional(),
  evolution: z.string().optional(),
});
export type FleetClank = z.infer<typeof fleetClankSchema>;

export const artefactTypeSchema = z.enum([
  "systemd-unit",
  "systemd-timer",
  "cron",
  "docker-compose",
  "dockerfile",
  "backup-script",
  "restore-script",
  "inventory",
  "continuity-seed",
  "survivability-doc",
  "incident-report",
  "fleet-law-doc",
  "deployment-template",
  "host-runtime-state",
  "syslog",
  "motherclank-var",
  "db-file",
  "operator-script",
]);
export type ArtefactType = z.infer<typeof artefactTypeSchema>;

export const retentionRiskSchema = z.enum(["low", "medium", "high", "rotating", "irrecoverable"]);
export const offHostCopySchema = z.enum(["yes", "no", "partial", "unknown"]);

export const evidenceArtefactSchema = z.object({
  id: z.string().min(1),
  system: z.string().min(1),
  artefact: z.string().min(1),
  artefactType: artefactTypeSchema,
  sourceLocation: z.string().min(1),
  preservedLocation: z.string().min(1),
  host: z.string().min(1),
  captureAt: z.string().min(1),
  hash: z.string().optional(),
  gitSha: z.string().optional(),
  evidencePeriod: z.string().min(1),
  relatedIncidentIds: z.array(z.string()),
  relatedLawIds: z.array(z.string()),
  retentionRisk: retentionRiskSchema,
  offHostCopy: offHostCopySchema,
  verification: epistemicStatus,
  notes: z.string().min(1),
});
export type EvidenceArtefact = z.infer<typeof evidenceArtefactSchema>;

export const evidenceGapSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  kind: z.enum(["missing-artefact", "live-unknown", "awaiting-review", "partial-incident", "irrecoverable"]),
  status: epistemicStatus,
  relatedHistoryIds: z.array(z.string()),
  relatedIncidentIds: z.array(z.string()),
  relatedLawIds: z.array(z.string()),
  whyItMatters: z.string().min(1),
  whatWouldCloseIt: z.string().min(1),
});
export type EvidenceGap = z.infer<typeof evidenceGapSchema>;

export const provenanceCellSchema = z.object({
  id: z.string().min(1),
  system: z.string().min(1),
  checkoutHead: z.string().min(1),
  originMain: z.string().min(1),
  deployedSha: z.string().min(1),
  runningState: z.string().min(1),
  schedulerState: z.string().min(1),
  authoritativeDb: z.string().min(1),
  dbEpoch: z.string().min(1),
  hostIdentity: z.string().min(1),
  backupState: z.string().min(1),
  confidence: epistemicStatus,
  asOf: z.string().min(1),
  notes: z.string().min(1),
});
export type ProvenanceCell = z.infer<typeof provenanceCellSchema>;

export const ledgerReviewActionSchema = z.enum([
  "keep",
  "downgrade",
  "split",
  "await-host-probe",
  "await-human",
]);

export const ledgerReviewSchema = z.object({
  historyId: z.string().min(1),
  currentConfidence: epistemicStatus,
  supportingArtefacts: z.array(z.string()),
  verifiedClaims: z.array(z.string()),
  inferredClaims: z.array(z.string()),
  overreadRisk: z.string().min(1),
  openQuestions: z.array(z.string()),
  recommendedAction: ledgerReviewActionSchema,
  recommendedConfidence: epistemicStatus,
});
export type LedgerReview = z.infer<typeof ledgerReviewSchema>;

export const nextStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  impact: z.enum(["high", "medium", "low"]),
  urgency: z.enum(["now", "soon", "later"]),
  confidence: epistemicStatus,
  dependency: z.string().min(1),
  scope: z.enum(["small", "medium", "large"]),
  doNow: z.boolean(),
  body: z.string().min(1),
});
export type NextStep = z.infer<typeof nextStepSchema>;

export const responsibilitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  layer: fleetLayerSchema,
  ownsQuestion: z.string().min(1),
  ownsState: z.string().min(1),
  observes: z.string().min(1),
  doesNotOwn: z.string().min(1),
  handsOffTo: z.string().min(1),
  forbidden: z.string().min(1),
  relatedFleetIds: z.array(z.string()),
  conceptIds: z.array(z.string()),
  confidence: epistemicStatus,
  asOf: z.string().min(1),
});
export type Responsibility = z.infer<typeof responsibilitySchema>;

export const thenNowSchema = z.object({
  id: z.string().min(1),
  topic: z.string().min(1),
  then: z.string().min(1),
  now: z.string().min(1),
  pressure: z.string().min(1),
  stillUnknown: z.string().min(1),
  conceptIds: z.array(z.string()),
  historyIds: z.array(z.string()),
  confidence: epistemicStatus,
});
export type ThenNow = z.infer<typeof thenNowSchema>;
