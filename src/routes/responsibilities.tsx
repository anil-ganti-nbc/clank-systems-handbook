import { createFileRoute, Link } from "@tanstack/react-router";
import { RESPONSIBILITIES } from "@/content/catalog";
import { Epistemic } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/responsibilities")({ component: Page });

function Page() {
  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight">System responsibilities</h1>
        <p className="mt-3 text-mute leading-relaxed">
          Federated, not a pyramid. If a brand-new agent opens tomorrow with no original
          chat, these are the different questions the ecosystem can answer — and the
          questions each component is forbidden to pretend it owns.
        </p>
      </header>

      <div className="overflow-x-auto rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.14em] text-mute">
              <th className="py-2 pr-3 font-medium">System</th>
              <th className="py-2 pr-3 font-medium">Layer</th>
              <th className="py-2 font-medium">Question it answers</th>
            </tr>
          </thead>
          <tbody>
            {RESPONSIBILITIES.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="py-2 pr-3">
                  <a href={`#${r.id}`} className="text-ink no-underline hover:text-accent">
                    {r.name}
                  </a>
                </td>
                <td className="py-2 pr-3 font-mono text-xs text-accent">{r.layer}</td>
                <td className="py-2 text-mute">{r.ownsQuestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {RESPONSIBILITIES.map((r) => (
          <article
            key={r.id}
            id={r.id}
            className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl">{r.name}</h2>
              <Epistemic status={r.confidence} />
            </div>
            <p className="mt-1 font-mono text-xs text-accent">
              {r.layer} · as of {r.asOf}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="Answers" v={r.ownsQuestion} />
              <Row k="Owns state" v={r.ownsState} />
              <Row k="Observes" v={r.observes} />
              <Row k="Does not own" v={r.doesNotOwn} />
              <Row k="Hands off to" v={r.handsOffTo} />
              <Row k="Forbidden" v={r.forbidden} />
            </dl>
          </article>
        ))}
      </div>

      <p className="text-sm text-mute">
        How those splits appeared:{" "}
        <Link to="/then-now" className="text-accent">
          Then vs now
        </Link>
        . How they sit next to Fleet Laws:{" "}
        <Link to="/architecture" className="text-accent">
          Architecture
        </Link>
        .
      </p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-mute">{k}</dt>
      <dd className="mt-0.5 leading-relaxed">{v}</dd>
    </div>
  );
}
