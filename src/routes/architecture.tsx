import { createFileRoute, Link } from "@tanstack/react-router";
import { LAWS, MODULES, PHASES } from "@/content/catalog";
import { ConceptList, Epistemic, IncidentLink } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/architecture")({ component: Page });

function Page() {
  const mods = MODULES.filter((m) => m.area === "architecture");
  return (
    <div className="space-y-10">
      <h1 className="font-display text-4xl tracking-tight">Architecture</h1>
      <p className="max-w-2xl text-mute">
        The diagram below is the present tense. It did not exist on 4 August. Each layer arrived as
        incident → lesson → rule → implementation. Unresolved limitations stay visible on purpose.
      </p>
      <svg viewBox="0 0 720 220" className="w-full rounded-xl bg-paper p-4 text-ink" role="img" aria-label="Fleet architecture">
        <rect x="20" y="70" width="150" height="80" rx="8" fill="#1c1f28" stroke="#c4a35a" />
        <text x="95" y="115" textAnchor="middle" fill="#e8e6df" fontSize="14">
          Clanks
        </text>
        <rect x="210" y="70" width="150" height="80" rx="8" fill="#1c1f28" stroke="#7f93b0" />
        <text x="285" y="115" textAnchor="middle" fill="#e8e6df" fontSize="14">
          Diagnostic
        </text>
        <rect x="400" y="70" width="150" height="80" rx="8" fill="#1c1f28" stroke="#7d9a78" />
        <text x="475" y="115" textAnchor="middle" fill="#e8e6df" fontSize="14">
          Motherclank
        </text>
        <rect x="590" y="70" width="110" height="80" rx="8" fill="#1c1f28" stroke="#9a9588" />
        <text x="645" y="115" textAnchor="middle" fill="#e8e6df" fontSize="13">
          Operators
        </text>
        <path d="M170 110 H210" stroke="#9a9588" />
        <path d="M360 110 H400" stroke="#9a9588" />
        <path d="M550 110 H590" stroke="#9a9588" />
        <text x="360" y="40" textAnchor="middle" fill="#9a9588" fontSize="12">
          SQLite stays with Clanks · adapters are read-only · harvest never writes
        </text>
      </svg>

      <section>
        <h2 className="font-display text-2xl">Evolution — before, pressure, rule, leftover</h2>
        <p className="mt-2 max-w-2xl text-mute">
          Compact timeline, not a second giant diagram. Each phase is a scar with a leftover
          limitation. Linked evidence lives on the ledger row for that phase.
        </p>
        <ol className="mt-4 space-y-3">
          {PHASES.map((p, i) => (
            <li key={p.id} className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a href={`/history#${p.id}`} className="font-display text-lg text-ink no-underline hover:text-accent">
                  <span className="mr-2 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </a>
                <span className="font-mono text-xs text-accent">{p.dateRange}</span>
              </div>
              <p className="mt-2 text-sm text-mute">{p.whyThisLayer}</p>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <Evo k="Before" v={p.before} />
                <Evo k="Failure / pressure" v={p.failurePressure} />
                <Evo k="New abstraction" v={p.newAbstraction} />
                <Evo k="New rule" v={p.newRule} />
                <Evo k="Resulting architecture" v={p.resultingArchitecture} />
                <Evo k="Still unsolved" v={p.unresolvedLimitations} />
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl">Law lineage</h2>
        <p className="mt-2 max-w-2xl text-mute">
          Fleet Laws v1 (d046d54, 2026-08-21). Eight binding invariants plus deferred Law 9. Each
          row names the incident that made the rule necessary, what it prevents, and what it cannot
          prevent.
        </p>
        <div className="mt-4 space-y-4">
          {LAWS.map((law) => (
            <article
              key={law.id}
              id={law.id}
              className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl">
                  Law {law.number}
                  {law.deferred ? " (deferred)" : ""}: {law.title}
                </h3>
                {law.deferred && <span className="text-xs uppercase tracking-[0.14em] text-mute">candidate, not binding</span>}
              </div>
              <p className="mt-3 text-sm leading-relaxed">{law.plainEnglish}</p>
              <p className="mt-2 font-mono text-xs text-mute">{law.rule}</p>
              <p className="mt-3 text-sm">
                <span className="text-mute">Prevents. </span>
                {law.prevents}
              </p>
              <p className="mt-1 text-sm">
                <span className="text-mute">Cannot prevent. </span>
                {law.cannotPrevent}
              </p>
              {law.triggeringIncidentIds.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-2 text-sm">
                  {law.triggeringIncidentIds.map((id) => (
                    <IncidentLink key={id} id={id} />
                  ))}
                </p>
              )}
              {law.triggeringIncidentIds.length === 0 && (
                <p className="mt-3 text-sm text-mute">
                  No Handbook lab is pinned as the sole trigger; specimens live in the law text.
                </p>
              )}
              <p className="mt-2 text-xs text-mute">Specimens: {law.specimens.join(" · ")}</p>
              <ul className="mt-2 space-y-1 text-xs text-mute">
                {law.evidence.map((e) => (
                  <li key={e.id}>
                    <Epistemic status={e.status} /> {e.repo}
                    {e.path ? `:${e.path}` : ""} — {e.note}
                  </li>
                ))}
              </ul>
              <ConceptList ids={law.conceptIds} />
            </article>
          ))}
        </div>
      </section>

      {mods.map((m) => (
        <section key={m.id} id={m.id}>
          <h2 className="font-display text-2xl">{m.title}</h2>
          <p className="mt-2 text-mute">{m.summary}</p>
          {m.sections.map((s) => (
            <div key={s.heading} className="mt-4">
              <h3 className="font-medium">{s.heading}</h3>
              <p className="mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
          <ConceptList ids={m.conceptIds} />
        </section>
      ))}

      <p className="text-sm text-mute">
        Current Clanks, with inventory vs HEAD vs live UNKNOWN:{" "}
        <Link to="/fleet" className="text-accent">
          Fleet map
        </Link>
        .
      </p>
    </div>
  );
}

function Evo({ k, v }: { k: string; v?: string }) {
  if (!v) return null;
  return (
    <div className="min-w-0 rounded-md bg-bg p-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-mute">{k}</dt>
      <dd className="mt-1 leading-relaxed">{v}</dd>
    </div>
  );
}