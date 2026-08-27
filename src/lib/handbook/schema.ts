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
  area: z.enum(["built", "basics", "systems", "architecture"]),
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
