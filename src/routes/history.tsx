import { createFileRoute, Link } from "@tanstack/react-router";
import { HISTORY, PHASES } from "@/content/catalog";
import { ConceptList, Epistemic, IncidentLink, LawLink } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/history")({ component: Page });

function Page() {
  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight">Historical ledger</h1>
        <p className="mt-3 text-mute leading-relaxed">
          The spine of this handbook. Every entry is labelled. UNKNOWN stays UNKNOWN. The
          machine-readable copy lives next to the lessons; the long-form ledger is the same facts in
          document form.
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
        <ol className="mt-4 space-y-4">
          {HISTORY.map((h) => (
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
        .
      </p>
    </div>
  );
}
