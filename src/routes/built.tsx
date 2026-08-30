import { createFileRoute, Link } from "@tanstack/react-router";
import { MODULES, TIMELINE } from "@/content/catalog";
import { ConceptList, Epistemic } from "@/components/handbook/concept-link";
import { Pipeline } from "@/components/handbook/pipeline";

export const Route = createFileRoute("/built")({ component: Built });

function Built() {
  const mods = MODULES.filter((m) => m.area === "built");
  return (
    <div className="space-y-10">
      <h1 className="font-display text-4xl tracking-tight">How we built it</h1>
      <p className="max-w-2xl text-mute">
        Chronological narrative, then the AI-assisted workflow. The pipeline below is not a chat
        transcript. Full artefact-level entries live in the{" "}
        <Link to="/history" className="text-accent">
          historical ledger
        </Link>
        .
      </p>
      <Pipeline />
      {mods.map((m) => (
        <section key={m.id}>
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
      <section>
        <h2 className="font-display text-2xl">Historical timeline</h2>
        <ol className="mt-4 space-y-4">
          {TIMELINE.map((ev) => (
            <li key={ev.id} className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-xs text-accent">{ev.date}</span>
                <Epistemic status={ev.status} />
              </div>
              <h3 className="mt-1 font-medium">{ev.title}</h3>
              <p className="mt-1 text-sm text-mute">{ev.body}</p>
              {ev.historyId && (
                <a href={`/history#${ev.historyId}`} className="mt-2 inline-block text-xs text-accent no-underline hover:underline">
                  Ledger {ev.historyId}
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
