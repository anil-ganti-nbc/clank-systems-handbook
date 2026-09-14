import { createFileRoute, Link } from "@tanstack/react-router";
import { THEN_NOW, V01_PHASE_IDS, PHASES, FLEET } from "@/content/catalog";
import { Epistemic } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/then-now")({ component: Page });

function Page() {
  const v01Known = 12;
  const postBirthGithub = FLEET.filter((c) =>
    ["clank-ledger", "clankops"].includes(c.id),
  ).length;
  const logicalNew = FLEET.filter((c) =>
    ["clank-ledger", "clankops", "quartermaster"].includes(c.id),
  ).length;
  const majorAbsent = FLEET.filter((c) =>
    ["standards-clank", "cvc-clank", "quartermaster", "clank-ledger", "clankops"].includes(c.id),
  ).length;

  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <p className="text-xs tracking-[0.2em] text-mute uppercase">v0.1 freeze → 14 September 2026</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">Then vs now</h1>
        <p className="mt-3 text-mute leading-relaxed">
          Handbook v0.1 froze on 30 August. That freeze was real. This page is the
          architectural pressure and response since then — not a changelog, and not a
          claim that everything was inevitable. Counts below are three different
          questions. Do not conflate them.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Count n={v01Known} label="logical systems v0.1 fleet map knew" hint="the original 12 cards" />
        <Count n={logicalNew} label="strict post-v0.1 logical births" hint="Quartermaster, Ledger, ClankOps" />
        <Count n={postBirthGithub} label="new GitHub repos after the freeze" hint="Ledger + ClankOps only" />
        <Count n={majorAbsent} label="major systems v0.1 omitted, now taught" hint="CVC, Standards, Quartermaster, Ledger, ClankOps" />
      </section>

      <p className="max-w-2xl text-sm text-mute">
        CVC existed at the freeze and was excluded on purpose. Standards existed at the
        boundary and then became a much larger system. Reddit is a source-admission
        experiment, not a sixth birth. v0.1 phases ({V01_PHASE_IDS.length}) stay intact;
        three phases were appended ({PHASES.length} total).
      </p>

      <ol className="space-y-4">
        {THEN_NOW.map((row) => (
          <li key={row.id} id={row.id} className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl">{row.topic}</h2>
              <Epistemic status={row.confidence} />
            </div>
            <dl className="mt-4 grid gap-3 md:grid-cols-2">
              <Pair k="30 August (v0.1)" v={row.then} />
              <Pair k="14 September" v={row.now} />
              <Pair k="Pressure" v={row.pressure} />
              <Pair k="Still UNKNOWN" v={row.stillUnknown} />
            </dl>
          </li>
        ))}
      </ol>

      <p className="text-sm text-mute">
        Boundaries that split apart:{" "}
        <Link to="/responsibilities" className="text-accent">
          System responsibilities
        </Link>
        . SHA columns that still refuse to collapse:{" "}
        <Link to="/fleet" className="text-accent">
          Fleet map
        </Link>
        .
      </p>
    </div>
  );
}

function Count({ n, label, hint }: { n: number; label: string; hint: string }) {
  return (
    <div className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="font-display text-3xl">{n}</div>
      <div className="mt-1 text-sm">{label}</div>
      <div className="mt-1 text-xs text-mute">{hint}</div>
    </div>
  );
}

function Pair({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0 rounded-md bg-bg p-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-mute">{k}</dt>
      <dd className="mt-1 text-sm leading-relaxed">{v}</dd>
    </div>
  );
}
