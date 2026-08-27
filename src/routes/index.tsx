import { createFileRoute, Link } from "@tanstack/react-router";
import { Pipeline } from "@/components/handbook/pipeline";
import { HANDBOOK, HANDBOOK_ISSUES } from "@/content/catalog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <p className="text-xs tracking-[0.2em] text-mute uppercase">Clank ecosystem · vertical slice</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Enough literacy to explain how this was actually built.
        </h1>
        <p className="mt-4 text-mute leading-relaxed">
          This is not a programming course and not a glossary with a GUI. It teaches Git, tests,
          deployment, state, and failure using real Clank artefacts. Historical claims are labelled
          verified, inferred, or incomplete. Nothing here assigns mastery — Dead Air University owns
          that.
        </p>
      </header>
      <Pipeline />
      <section className="grid gap-3 sm:grid-cols-3">
        <Stat n={HANDBOOK.concepts.length} label="concepts with three layers" />
        <Stat n={HANDBOOK.incidents.length} label="investigation cases" />
        <Stat n={HANDBOOK_ISSUES.length} label="content validation issues (must be 0)" />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <Card to="/labs" title="Investigate a real incident" body="Freeze a hypothesis before the archive speaks. Three cases: materialization gap, QC flood, BANKAI zero-recall." />
        <Card to="/basics" title="Git / HEAD / SHA" body="What a fingerprint proves. Why the file you are looking at may not be the process that is running." />
        <Card to="/explain" title="Explain it back" body="Oral-explanation prompts. Freeze, then compare to a model answer. You grade yourself." />
        <Card to="/glossary" title="Searchable glossary" body="Reference layer only. Every term links to the story where it earned its keep." />
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="font-display text-3xl">{n}</div>
      <div className="text-sm text-mute">{label}</div>
    </div>
  );
}

function Card({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link to={to} className="block rounded-xl bg-paper p-5 text-ink no-underline shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:shadow-[0_0_0_1px_rgba(196,163,90,0.4)]">
      <h2 className="font-display text-xl">{title}</h2>
      <p className="mt-2 text-sm text-mute">{body}</p>
    </Link>
  );
}
