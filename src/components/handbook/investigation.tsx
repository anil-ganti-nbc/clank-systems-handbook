import { useMemo, useState } from "react";
import type { Incident } from "@/lib/handbook/schema";
import { ConceptList, Epistemic } from "./concept-link";
import { completeLab } from "@/lib/handbook/state";
import { emitPracticeResult } from "@/lib/handbook/practice";

export function InvestigationLab({ incident }: { incident: Incident }) {
  const started = useMemo(() => Date.now(), [incident.id]);
  const [openProbes, setOpenProbes] = useState<string[]>([]);
  const [hypothesis, setHypothesis] = useState<string | null>(null);
  const [frozen, setFrozen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  function toggleProbe(id: string) {
    if (frozen) return;
    setOpenProbes((p) => (p.includes(id) ? p : [...p, id]));
  }

  function freeze() {
    if (!hypothesis) return;
    setFrozen(true);
  }

  function reveal() {
    if (!frozen) return;
    setRevealed(true);
    completeLab(incident.id);
    emitPracticeResult({
      conceptId: incident.conceptIds[0] ?? incident.id,
      lessonId: incident.id,
      completed: true,
      timeSpentMs: Date.now() - started,
      metadata: { incident: incident.id, frozen: true, correct: null },
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <Epistemic status={incident.epistemic} />
        <h1 className="mt-2 font-display text-3xl tracking-tight">{incident.title}</h1>
        <p className="mt-2 text-sm text-mute">
          {incident.dateRange} · {incident.complexity} · {incident.systems.join(" · ")}
        </p>
      </div>

      <section>
        <h2 className="text-xs tracking-[0.16em] text-mute uppercase">Briefing</h2>
        <p className="mt-2 leading-relaxed">{incident.context}</p>
        <p className="mt-3 leading-relaxed text-accent">{incident.symptom}</p>
      </section>

      <section>
        <h2 className="text-xs tracking-[0.16em] text-mute uppercase">Evidence locker</h2>
        <p className="mt-2 text-sm text-mute">Open probes deliberately. Freeze a hypothesis before the reveal.</p>
        <div className="mt-3 space-y-2">
          {incident.probes.map((p) => {
            const open = openProbes.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleProbe(p.id)}
                className="w-full rounded-lg bg-paper p-3 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              >
                <div className="font-medium">{p.label}</div>
                {open && (
                  <p className="mt-2 text-sm text-mute">
                    {p.finding} <Epistemic status={p.status} />
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xs tracking-[0.16em] text-mute uppercase">Hypotheses</h2>
        <div className="mt-3 space-y-2">
          {incident.competingHypotheses.map((h) => (
            <button
              key={h}
              type="button"
              disabled={frozen}
              onClick={() => setHypothesis(h)}
              className={`w-full rounded-lg p-3 text-left text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.06)] ${
                hypothesis === h ? "bg-paper ring-1 ring-accent" : "bg-paper/60"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!hypothesis || frozen}
            onClick={freeze}
            className="rounded-md bg-accent px-4 py-2 text-sm text-bg disabled:opacity-40"
          >
            {frozen ? "Hypothesis frozen" : "Freeze hypothesis"}
          </button>
          <button
            type="button"
            disabled={!frozen || revealed}
            onClick={reveal}
            className="rounded-md border border-line px-4 py-2 text-sm disabled:opacity-40"
          >
            Reveal what the archive says
          </button>
        </div>
      </section>

      {revealed && (
        <section className="grid gap-6 rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:grid-cols-2">
          <div>
            <h3 className="text-xs tracking-[0.16em] text-mute uppercase">What you froze</h3>
            <p className="mt-2 text-sm">{hypothesis}</p>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.16em] text-mute uppercase">Diagnosis (archive)</h3>
            <p className="mt-2 text-sm">{incident.diagnosis}</p>
          </div>
          <div className="md:col-span-2 space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Root cause.</strong> {incident.rootCause}
            </p>
            <p>
              <strong>Contributing.</strong> {incident.contributingCauses.join(" ")}
            </p>
            <p>
              <strong>Repair.</strong> {incident.remediation}
            </p>
            <p>
              <strong>Verification.</strong> {incident.verification}
            </p>
            <p>
              <strong>Residual risk.</strong> {incident.residualRisk}
            </p>
            <p className="text-accent">{incident.architecturalLesson}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xs tracking-[0.16em] text-mute uppercase">Evidence</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {incident.evidence.map((e) => (
                <li key={e.id}>
                  <Epistemic status={e.status} />{" "}
                  <span className="font-mono text-xs">
                    {e.repo}
                    {e.path ? `:${e.path}` : ""}
                    {e.sha ? `@${e.sha.slice(0, 7)}` : ""}
                  </span>
                  <div className="text-mute">{e.note}</div>
                </li>
              ))}
            </ul>
            <ConceptList ids={incident.conceptIds} />
          </div>
        </section>
      )}
    </div>
  );
}
