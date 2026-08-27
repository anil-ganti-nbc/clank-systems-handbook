import { createFileRoute } from "@tanstack/react-router";
import { MODULES } from "@/content/catalog";
import { ConceptList } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/basics")({ component: Page });

function Page() {
  const mods = MODULES.filter((m) => m.area === "basics");
  return (
    <div className="space-y-10">
      <h1 className="font-display text-4xl tracking-tight">Development basics</h1>
      <p className="max-w-2xl text-mute">
        Taught with Clank artefacts, not textbook Git. The point is to explain HEAD versus origin
        versus the running host without reducing it to 'the AI wrote it'.
      </p>
      {mods.map((m) => (
        <section key={m.id} className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
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
    </div>
  );
}
