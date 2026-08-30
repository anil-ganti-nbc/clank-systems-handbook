import { createFileRoute, Link } from "@tanstack/react-router";
import { FLEET } from "@/content/catalog";
import { Epistemic } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/fleet")({ component: Page });

function Page() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight">Current fleet</h1>
        <p className="mt-3 text-mute leading-relaxed">
          A snapshot, not a live probe. Archaeology inventory was current through 2026-08-22.
          Later GitHub pushes are repo HEAD, not production. Stale notes are the honest part of
          the map. UNKNOWN is left visible on purpose.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {FLEET.map((cl) => (
          <article
            key={cl.id}
            id={cl.id}
            className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl">{cl.name}</h2>
              <Epistemic status={cl.confidence} />
            </div>
            <p className="mt-1 font-mono text-xs text-accent">as of {cl.asOf}</p>
            <p className="mt-3 text-sm leading-relaxed">{cl.purpose}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="Sources" v={cl.sources} />
              <Row k="Scheduling" v={cl.scheduling} />
              <Row k="Persistence" v={cl.persistence} />
              <Row k="Host" v={cl.host} />
              <Row k="Status" v={cl.status} />
              <Row k="Limitation" v={cl.limitation} />
              <Row k="Unresolved" v={cl.unresolved} />
              <Row k="Motherclank" v={cl.motherclank} />
            </dl>
            {cl.staleNote && (
              <p className="mt-4 rounded-md bg-bg p-3 text-sm text-accent">{cl.staleNote}</p>
            )}
          </article>
        ))}
      </div>
      <p className="text-sm text-mute">
        Why this shape exists:{" "}
        <Link to="/history" className="text-accent">
          History
        </Link>{" "}
        and{" "}
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
