import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FAILURE_CLASS_OPTIONS, HISTORY, historyMatchesFailureClass, LAWS, PHASES } from "@/content/catalog";
import { ConceptList, Epistemic, IncidentLink, LawLink } from "@/components/handbook/concept-link";
import type { EpistemicStatus } from "@/lib/handbook/schema.ts";

export const Route = createFileRoute("/history")({ component: Page });

const EPISTEMIC_OPTIONS: { id: "all" | EpistemicStatus; label: string }[] = [
  { id: "all", label: "all" },
  { id: "verified", label: "verified" },
  { id: "inferred", label: "inferred" },
  { id: "incomplete", label: "incomplete" },
  { id: "illustrative", label: "illustrative" },
];

function Page() {
  const [q, setQ] = useState("");
  const [law, setLaw] = useState("all");
  const [system, setSystem] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [epistemic, setEpistemic] = useState<(typeof EPISTEMIC_OPTIONS)[number]["id"]>("all");
  const [failure, setFailure] = useState("all");
  const systems = useMemo(() => Array.from(new Set(HISTORY.flatMap((h) => h.systems))).sort(), []);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return HISTORY.filter((h) => {
      if (law !== "all" && !h.lawIds.includes(law)) return false;
      if (system !== "all" && !h.systems.some((s) => s === system)) return false;
      if (from && h.date < from) return false;
      if (to && h.date > to) return false;
      if (epistemic !== "all" && h.confidence !== epistemic) return false;
      if (failure !== "all" && !historyMatchesFailureClass(h, failure)) return false;
      if (!needle) return true;
      const blob = [h.event, h.change, h.why, h.systems.join(" "), h.conceptIds.join(" "), h.id].join(" ").toLowerCase();
      return blob.includes(needle);
    });
  }, [q, law, system, from, to, epistemic, failure]);

  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight">Historical ledger</h1>
        <p className="mt-3 text-mute leading-relaxed">
          The spine of this handbook. Every entry is labelled. UNKNOWN stays UNKNOWN. The
          machine-readable copy lives next to the lessons; the long-form ledger is the same facts in
          document form. Filter by concept, Clank, date, law, epistemic status, or failure class —
          filtering does not rewrite the record.
        </p>
      </header>

      <section>
        <h2 className="font-display text-2xl">Phases — why each layer appeared</h2>
        <ol className="mt-4 space-y-3">
          {PHASES.map((p) => (
            <li key={p.id} id={p.id} className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-xs text-accent">{p.dateRange}</span>
                <Epistemic status={p.confidence} />
              </div>
              <h3 className="mt-1 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{p.summary}</p>
              <p className="mt-3 text-sm text-accent">Why this layer. {p.whyThisLayer}</p>
              {(p.before || p.failurePressure) && (
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {p.before && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-mute">Before</dt>
                      <dd className="text-mute">{p.before}</dd>
                    </div>
                  )}
                  {p.failurePressure && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-mute">Pressure</dt>
                      <dd className="text-mute">{p.failurePressure}</dd>
                    </div>
                  )}
                  {p.newAbstraction && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-mute">New abstraction</dt>
                      <dd className="text-mute">{p.newAbstraction}</dd>
                    </div>
                  )}
                  {p.newRule && (
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-mute">New rule</dt>
                      <dd className="text-mute">{p.newRule}</dd>
                    </div>
                  )}
                  {p.unresolvedLimitations && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs uppercase tracking-[0.14em] text-mute">Still unsolved</dt>
                      <dd className="text-mute">{p.unresolvedLimitations}</dd>
                    </div>
                  )}
                </dl>
              )}
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-mute">Components</dt>
                  <dd className="text-mute">{p.components.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-mute">Storage</dt>
                  <dd className="text-mute">{p.storage}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-mute">Scheduling</dt>
                  <dd className="text-mute">{p.scheduling}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-mute">Supervision</dt>
                  <dd className="text-mute">{p.fleetSupervision}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl">Ledger entries</h2>
        <div className="mt-4 space-y-3 rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events, concepts, Clanks"
            className="w-full rounded-md bg-bg px-3 py-3"
            aria-label="Search ledger"
          />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">Clank</span>
              <select value={system} onChange={(e) => setSystem(e.target.value)} className="mt-1 w-full rounded-md bg-bg px-3 py-3">
                <option value="all">all</option>
                {systems.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">Law</span>
              <select value={law} onChange={(e) => setLaw(e.target.value)} className="mt-1 w-full rounded-md bg-bg px-3 py-3">
                <option value="all">all</option>
                {LAWS.map((l) => (
                  <option key={l.id} value={l.id}>
                    Law {l.number}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">Failure class</span>
              <select value={failure} onChange={(e) => setFailure(e.target.value)} className="mt-1 w-full rounded-md bg-bg px-3 py-3" aria-label="Failure class">
                <option value="all">all</option>
                {FAILURE_CLASS_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">Epistemic</span>
              <select
                value={epistemic}
                onChange={(e) => setEpistemic(e.target.value as (typeof EPISTEMIC_OPTIONS)[number]["id"])}
                className="mt-1 w-full rounded-md bg-bg px-3 py-3"
                aria-label="Epistemic status"
              >
                {EPISTEMIC_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">From date</span>
              <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="2026-08-03" className="mt-1 w-full rounded-md bg-bg px-3 py-3" />
            </label>
            <label className="text-sm">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">To date</span>
              <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="2026-08-27" className="mt-1 w-full rounded-md bg-bg px-3 py-3" />
            </label>
          </div>
          <p className="text-xs text-mute">
            Showing {filtered.length} of {HISTORY.length} rows
          </p>
        </div>
        <ol className="mt-4 space-y-4">
          {filtered.map((h) => (
            <li key={h.id} id={h.id} className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-xs text-accent">{h.date}</span>
                <Epistemic status={h.confidence} />
              </div>
              <h3 className="mt-1 font-display text-xl">{h.event}</h3>
              <p className="mt-1 text-xs text-mute">{h.systems.join(" · ")}</p>
              <div className="mt-3 space-y-2 text-sm leading-relaxed">
                <p>
                  <span className="text-mute">Before. </span>
                  {h.before}
                </p>
                <p>
                  <span className="text-mute">Change. </span>
                  {h.change}
                </p>
                <p>
                  <span className="text-mute">Why. </span>
                  {h.why}
                </p>
                {h.whatFailed && (
                  <p>
                    <span className="text-mute">What failed. </span>
                    {h.whatFailed}
                  </p>
                )}
                {h.diagnosis && (
                  <p>
                    <span className="text-mute">Diagnosis. </span>
                    {h.diagnosis}
                  </p>
                )}
                {h.fix && (
                  <p>
                    <span className="text-mute">Fix. </span>
                    {h.fix}
                  </p>
                )}
                {h.verification && (
                  <p>
                    <span className="text-mute">Verification. </span>
                    {h.verification}
                  </p>
                )}
                {h.residualRisk && (
                  <p>
                    <span className="text-mute">Residual. </span>
                    {h.residualRisk}
                  </p>
                )}
                {h.laterConsequence && (
                  <p className="text-accent">{h.laterConsequence}</p>
                )}
              </div>
              <ul className="mt-3 space-y-1 text-xs text-mute">
                {h.evidence.map((e) => (
                  <li key={e.id}>
                    <Epistemic status={e.status} />{" "}
                    <span className="font-mono">
                      {e.repo}
                      {e.path ? `:${e.path}` : ""}
                      {e.sha ? `@${e.sha.slice(0, 7)}` : ""}
                    </span>
                    <span> — {e.note}</span>
                  </li>
                ))}
              </ul>
              {h.lawIds.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-2 text-sm">
                  {h.lawIds.map((id) => (
                    <LawLink key={id} id={id} />
                  ))}
                </p>
              )}
              {h.incidentIds.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-2 text-sm">
                  {h.incidentIds.map((id) => (
                    <IncidentLink key={id} id={id} />
                  ))}
                </p>
              )}
              <ConceptList ids={h.conceptIds} />
            </li>
          ))}
        </ol>
      </section>

      <p className="text-sm text-mute">
        Architecture evolution and law lineage live on the{" "}
        <Link to="/architecture" className="text-accent">
          Architecture
        </Link>{" "}
        page. Current Clanks:{" "}
        <Link to="/fleet" className="text-accent">
          Fleet
        </Link>
        . Confidence gaps:{" "}
        <Link to="/evidence" className="text-accent">
          Evidence
        </Link>
        .
      </p>
    </div>
  );
}