import type { Concept, ExplainPrompt, Incident, Module, TimelineEvent } from "./schema.ts";
import { conceptSchema, explainPromptSchema, incidentSchema, moduleSchema, timelineEventSchema } from "./schema.ts";

export interface ValidationIssue {
  code: string;
  message: string;
}

export function validateHandbook(input: {
  concepts: Concept[];
  modules: Module[];
  incidents: Incident[];
  timeline: TimelineEvent[];
  prompts: ExplainPrompt[];
}): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const conceptIds = new Set<string>();
  const incidentIds = new Set<string>();
  const moduleIds = new Set<string>();

  for (const c of input.concepts) {
    const p = conceptSchema.safeParse(c);
    if (!p.success) issues.push({ code: "schema", message: `concept ${c.id}: ${p.error.message}` });
    if (conceptIds.has(c.id)) issues.push({ code: "duplicate", message: `duplicate concept ${c.id}` });
    conceptIds.add(c.id);
  }
  for (const m of input.modules) {
    const p = moduleSchema.safeParse(m);
    if (!p.success) issues.push({ code: "schema", message: `module ${m.id}: ${p.error.message}` });
    if (moduleIds.has(m.id)) issues.push({ code: "duplicate", message: `duplicate module ${m.id}` });
    moduleIds.add(m.id);
    for (const id of m.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `module ${m.id} unknown concept ${id}` });
    }
  }
  for (const inc of input.incidents) {
    const p = incidentSchema.safeParse(inc);
    if (!p.success) issues.push({ code: "schema", message: `incident ${inc.id}: ${p.error.message}` });
    if (incidentIds.has(inc.id)) issues.push({ code: "duplicate", message: `duplicate incident ${inc.id}` });
    incidentIds.add(inc.id);
    for (const id of inc.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `incident ${inc.id} unknown concept ${id}` });
    }
    const evIds = new Set<string>();
    for (const e of inc.evidence) {
      if (evIds.has(e.id)) issues.push({ code: "duplicate", message: `duplicate evidence ${e.id}` });
      evIds.add(e.id);
    }
  }
  for (const ev of input.timeline) {
    const p = timelineEventSchema.safeParse(ev);
    if (!p.success) issues.push({ code: "schema", message: `timeline ${ev.id}: ${p.error.message}` });
    for (const id of ev.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `timeline ${ev.id} unknown concept ${id}` });
    }
  }
  const promptIds = new Set<string>();
  for (const pr of input.prompts) {
    const p = explainPromptSchema.safeParse(pr);
    if (!p.success) issues.push({ code: "schema", message: `prompt ${pr.id}: ${p.error.message}` });
    if (promptIds.has(pr.id)) issues.push({ code: "duplicate", message: `duplicate prompt ${pr.id}` });
    promptIds.add(pr.id);
    for (const id of pr.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `prompt ${pr.id} unknown concept ${id}` });
    }
  }
  return issues;
}
