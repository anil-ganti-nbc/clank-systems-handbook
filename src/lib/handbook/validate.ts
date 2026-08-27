import type {
  Concept,
  ExplainPrompt,
  FleetClank,
  FleetLaw,
  HistoryEntry,
  HistoryPhase,
  Incident,
  Module,
  TimelineEvent,
} from "./schema.ts";
import {
  conceptSchema,
  explainPromptSchema,
  fleetClankSchema,
  fleetLawSchema,
  historyEntrySchema,
  historyPhaseSchema,
  incidentSchema,
  moduleSchema,
  timelineEventSchema,
} from "./schema.ts";

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
  phases?: HistoryPhase[];
  history?: HistoryEntry[];
  laws?: FleetLaw[];
  fleet?: FleetClank[];
}): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const conceptIds = new Set<string>();
  const incidentIds = new Set<string>();
  const moduleIds = new Set<string>();
  const terms = new Map<string, string>();
  const phaseIds = new Set<string>();
  const historyIds = new Set<string>();
  const lawIds = new Set<string>();

  for (const c of input.concepts) {
    const p = conceptSchema.safeParse(c);
    if (!p.success) issues.push({ code: "schema", message: `concept ${c.id}: ${p.error.message}` });
    if (conceptIds.has(c.id)) issues.push({ code: "duplicate", message: `duplicate concept ${c.id}` });
    conceptIds.add(c.id);
    const key = c.term.trim().toLowerCase();
    const prev = terms.get(key);
    if (prev && prev !== c.id) issues.push({ code: "duplicate", message: `duplicate glossary term "${c.term}" (${prev}, ${c.id})` });
    terms.set(key, c.id);
    for (const rel of c.related) {
      // related may point at concepts added later in the same array; check after the loop
    }
  }
  for (const c of input.concepts) {
    for (const rel of c.related) {
      if (!conceptIds.has(rel)) issues.push({ code: "dangling", message: `concept ${c.id} related unknown ${rel}` });
    }
  }

  for (const m of input.modules) {
    const p = moduleSchema.safeParse(m);
    if (!p.success) issues.push({ code: "schema", message: `module ${m.id}: ${p.error.message}` });
    if (moduleIds.has(m.id)) issues.push({ code: "duplicate", message: `duplicate module ${m.id}` });
    moduleIds.add(m.id);
    for (const id of m.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `module ${m.id} unknown concept ${id}` });
    }
    for (const s of m.sections) {
      for (const id of s.conceptIds ?? []) {
        if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `module ${m.id} section "${s.heading}" unknown concept ${id}` });
      }
    }
  }

  for (const inc of input.incidents) {
    const p = incidentSchema.safeParse(inc);
    if (!p.success) issues.push({ code: "schema", message: `incident ${inc.id}: ${p.error.message}` });
    if (incidentIds.has(inc.id)) issues.push({ code: "duplicate", message: `duplicate incident ${inc.id}` });
    incidentIds.add(inc.id);
    if (!inc.epistemic) issues.push({ code: "epistemic", message: `incident ${inc.id} missing epistemic status` });
    for (const id of inc.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `incident ${inc.id} unknown concept ${id}` });
    }
    const evIds = new Set<string>();
    for (const e of inc.evidence) {
      if (evIds.has(e.id)) issues.push({ code: "duplicate", message: `duplicate evidence ${e.id}` });
      evIds.add(e.id);
      if (!e.status) issues.push({ code: "epistemic", message: `evidence ${e.id} missing status` });
      if (!e.repo && !e.path && !e.url) issues.push({ code: "malformed", message: `evidence ${e.id} has no locator` });
      if (e.kind === "commit" && e.sha && e.sha.length < 7) {
        issues.push({ code: "malformed", message: `evidence ${e.id} commit SHA too short` });
      }
    }
    const probeIds = new Set<string>();
    for (const pr of inc.probes) {
      if (probeIds.has(pr.id)) issues.push({ code: "duplicate", message: `duplicate probe ${pr.id}` });
      probeIds.add(pr.id);
    }
  }

  for (const phase of input.phases ?? []) {
    const p = historyPhaseSchema.safeParse(phase);
    if (!p.success) issues.push({ code: "schema", message: `phase ${phase.id}: ${p.error.message}` });
    if (phaseIds.has(phase.id)) issues.push({ code: "duplicate", message: `duplicate phase ${phase.id}` });
    phaseIds.add(phase.id);
    if (!phase.confidence) issues.push({ code: "epistemic", message: `phase ${phase.id} missing confidence` });
  }

  let lastDate = "";
  for (const h of input.history ?? []) {
    const p = historyEntrySchema.safeParse(h);
    if (!p.success) issues.push({ code: "schema", message: `history ${h.id}: ${p.error.message}` });
    if (historyIds.has(h.id)) issues.push({ code: "duplicate", message: `duplicate history ${h.id}` });
    historyIds.add(h.id);
    if (phaseIds.size && !phaseIds.has(h.phaseId)) {
      issues.push({ code: "dangling", message: `history ${h.id} unknown phase ${h.phaseId}` });
    }
    if (!h.confidence) issues.push({ code: "epistemic", message: `history ${h.id} missing confidence` });
    for (const id of h.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `history ${h.id} unknown concept ${id}` });
    }
    for (const id of h.incidentIds) {
      if (!incidentIds.has(id)) issues.push({ code: "dangling", message: `history ${h.id} unknown incident ${id}` });
    }
    const evIds = new Set<string>();
    for (const e of h.evidence) {
      if (evIds.has(e.id)) issues.push({ code: "duplicate", message: `duplicate evidence ${e.id}` });
      evIds.add(e.id);
      if (!e.status) issues.push({ code: "epistemic", message: `history evidence ${e.id} missing status` });
      if (!e.repo && !e.path && !e.url) issues.push({ code: "malformed", message: `history evidence ${e.id} has no locator` });
    }
    for (const c of h.commits) {
      if (c.sha.length < 7) issues.push({ code: "malformed", message: `history ${h.id} commit SHA too short` });
    }
    if (lastDate && h.date < lastDate) {
      issues.push({ code: "order", message: `history ${h.id} date ${h.date} precedes previous ${lastDate}` });
    }
    lastDate = h.date;
  }

  for (const law of input.laws ?? []) {
    const p = fleetLawSchema.safeParse(law);
    if (!p.success) issues.push({ code: "schema", message: `law ${law.id}: ${p.error.message}` });
    if (lawIds.has(law.id)) issues.push({ code: "duplicate", message: `duplicate law ${law.id}` });
    lawIds.add(law.id);
    for (const id of law.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `law ${law.id} unknown concept ${id}` });
    }
    for (const id of law.triggeringIncidentIds) {
      if (!incidentIds.has(id)) issues.push({ code: "dangling", message: `law ${law.id} unknown incident ${id}` });
    }
    for (const id of law.historyIds) {
      if (historyIds.size && !historyIds.has(id)) issues.push({ code: "dangling", message: `law ${law.id} unknown history ${id}` });
    }
    for (const e of law.evidence) {
      if (!e.status) issues.push({ code: "epistemic", message: `law evidence ${e.id} missing status` });
      if (!e.repo && !e.path && !e.url) issues.push({ code: "malformed", message: `law evidence ${e.id} has no locator` });
    }
  }

  for (const inc of input.incidents) {
    for (const id of inc.lawIds ?? []) {
      if (lawIds.size && !lawIds.has(id)) issues.push({ code: "dangling", message: `incident ${inc.id} unknown law ${id}` });
    }
    for (const id of inc.historyIds ?? []) {
      if (historyIds.size && !historyIds.has(id)) issues.push({ code: "dangling", message: `incident ${inc.id} unknown history ${id}` });
    }
  }

  for (const h of input.history ?? []) {
    for (const id of h.lawIds) {
      if (lawIds.size && !lawIds.has(id)) issues.push({ code: "dangling", message: `history ${h.id} unknown law ${id}` });
    }
  }

  let lastTimeline = "";
  for (const ev of input.timeline) {
    const p = timelineEventSchema.safeParse(ev);
    if (!p.success) issues.push({ code: "schema", message: `timeline ${ev.id}: ${p.error.message}` });
    if (!ev.status) issues.push({ code: "epistemic", message: `timeline ${ev.id} missing status` });
    for (const id of ev.conceptIds) {
      if (!conceptIds.has(id)) issues.push({ code: "dangling", message: `timeline ${ev.id} unknown concept ${id}` });
    }
    if (ev.historyId && historyIds.size && !historyIds.has(ev.historyId)) {
      issues.push({ code: "dangling", message: `timeline ${ev.id} unknown history ${ev.historyId}` });
    }
    for (const id of ev.lawIds ?? []) {
      if (lawIds.size && !lawIds.has(id)) issues.push({ code: "dangling", message: `timeline ${ev.id} unknown law ${id}` });
    }
    if (lastTimeline && ev.date < lastTimeline) {
      issues.push({ code: "order", message: `timeline ${ev.id} date ${ev.date} precedes previous ${lastTimeline}` });
    }
    lastTimeline = ev.date;
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

  for (const cl of input.fleet ?? []) {
    const p = fleetClankSchema.safeParse(cl);
    if (!p.success) issues.push({ code: "schema", message: `fleet ${cl.id}: ${p.error.message}` });
    if (!cl.confidence) issues.push({ code: "epistemic", message: `fleet ${cl.id} missing confidence` });
  }

  return issues;
}
