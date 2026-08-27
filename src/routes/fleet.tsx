import { createFileRoute, Link } from "@tanstack/react-router";
import { FLEET } from "@/content/catalog";
import { Epistemic } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/fleet")({ component: Page });

function shortSha(value: string): string {
  if (!value || /UNKNOWN/i.test(value)) return "UNKNOWN";
  return value.slice(0, 7);
}

function Page() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight">Current fleet</h1>
        <p className="mt-3 text-mute leading-relaxed">
          A snapshot, not a live probe. Each card shows three SHAs on purpose: the 2026-08-22
          fleet.yaml inventory, GitHub default-branch HEAD as of this teaching capture, and live
          deployed SHA left UNKNOWN. GitHub state is not production state. If HEAD is newer than
          inventory, both are shown — neither is chosen as the truth. UNKNOWN is left visible on
          purpose.
        </p>
      </header>
      <div className="overflow-x-auto rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <p className="text-xs uppercase tracking-[0.14em] text-mute">Teaching snapshot — three columns, none inferred</p>
        <table className="mt-3 w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.14em] text-mute">
              <th className="py-2 pr-3 font-medium">Clank</th>
              <th className="py-2 pr-3 font-medium">Inventory SHA (2026-08-22)</th>
              <th className="py-2 pr-3 font-medium">Repo HEAD (GitHub)</th>
              <th className="py-2 font-medium">Live deployed</th>
            </tr>
          </thead>
          <tbody>
            {FLEET.map((cl) => {
              const diverge = shortSha(cl.inventorySha) !== shortSha(cl.repoHead);
              return (
                <tr key={cl.id} className="border-t border-line">
                  <td className="py-2 pr-3">
                    <a href={`#${cl.id}`} className="text-ink no-underline hover:text-accent">
                      {cl.name}
                    </a>
                  </td>
                  <td className="py-2 pr-3 font-mono text-xs">{shortSha(cl.inventorySha)}</td>
                  <td className={`py-2 pr-3 font-mono text-xs ${diverge ? "text-accent" : ""}`}>
                    {shortSha(cl.repoHead)}
                    {diverge ? " · newer/different" : ""}
                  </td>
                  <td className="py-2 font-mono text-xs text-accent">{cl.liveDeployedSha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <ShaCell
                k="Inventory SHA"
                v={shortSha(cl.inventorySha)}
                note={`${cl.inventoryAsOf}${cl.inventoryNote ? ` · ${cl.inventoryNote}` : ""}`}
              />
              <ShaCell k="Repo HEAD" v={shortSha(cl.repoHead)} note={cl.repoHeadNote} />
              <ShaCell k="Live deployed" v={cl.liveDeployedSha} note="No live host probe this campaign. Law 6: missing stays UNKNOWN." />
            </div>
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

function ShaCell({ k, v, note }: { k: string; v: string; note: string }) {
  return (
    <div className="min-w-0 rounded-md bg-bg p-3">
      <div className="text-xs uppercase tracking-[0.14em] text-mute">{k}</div>
      <div className="mt-1 font-mono text-sm text-accent">{v}</div>
      <p className="mt-1 text-xs leading-relaxed text-mute">{note}</p>
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