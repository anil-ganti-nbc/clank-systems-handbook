import { createFileRoute } from "@tanstack/react-router";
import { MODULES } from "@/content/catalog";
import { ConceptList } from "@/components/handbook/concept-link";

export const Route = createFileRoute("/architecture")({ component: Page });

function Page() {
  const mods = MODULES.filter((m) => m.area === "architecture");
  return (
    <div className="space-y-10">
      <h1 className="font-display text-4xl tracking-tight">Architecture</h1>
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
    </div>
  );
}
