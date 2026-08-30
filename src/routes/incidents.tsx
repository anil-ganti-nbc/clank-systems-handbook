import { createFileRoute, Link } from "@tanstack/react-router";
import { INCIDENTS } from "@/content/catalog";
import { Epistemic, LawLink } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/incidents")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl tracking-tight">Incident archive</h1>
      <p className="max-w-2xl text-mute">
        Real cases. If a fact is not in the cited artefact, it is labelled inferred or incomplete —
        never filled in by a fluent paragraph. Each case is also an investigation lab.
      </p>
      <ul className="space-y-4">
        {INCIDENTS.map((inc) => (
          <li key={inc.id}>
            <Link
              to="/labs/$incidentId"
              params={{ incidentId: inc.id }}
              className="block rounded-xl bg-paper p-5 text-ink no-underline shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-accent">{inc.complexity}</span>
                <Epistemic status={inc.epistemic} />
              </div>
              <h2 className="mt-2 font-display text-2xl">{inc.title}</h2>
              <p className="mt-2 text-sm text-mute">{inc.symptom}</p>
            </Link>
            {inc.lawIds && inc.lawIds.length > 0 && (
              <p className="mt-2 flex flex-wrap gap-2 px-1 text-sm">
                {inc.lawIds.map((id) => (
                  <LawLink key={id} id={id} />
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
