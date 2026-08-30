import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ARTEFACTS,
  EVIDENCE_CAPTURE_UTC,
  EVIDENCE_GAPS,
  HISTORY,
  INCIDENTS,
  LAWS,
  LEDGER_REVIEWS,
  LIVE_HOST_PROBE,
  NEXT_STEPS,
  DO_NOT_DO_YET,
  PROVENANCE,
  historyById,
} from "@/content/catalog";
import { Epistemic, IncidentLink, LawLink } from "@/components/handbook/concept-link";
import type { EpistemicStatus } from "@/lib/handbook/schema";

export const Route = createFileRoute("/evidence")({ component: Page });

const STATES: Array<EpistemicStatus | "all"> = ["all", "verified", "inferred", "incomplete", "illustrative"];

function Page() {
  const [state, setState] = useState<(typeof STATES)[number]>("all");
  const [q, setQ] = useState("");
  const [system, setSystem] = useState("all");
  const [law, setLaw] = useState("all");
  const needle = q.trim().toLowerCase();

  const systems = useMemo(() => {
    const s = new Set<string>();
    for (const a of ARTEFACTS) s.add(a.system);
    for (const h of HISTORY) for (const x of h.systems) s.add(x);
    return Array.from(s).sort();
  }, []);

  const historyHits = useMemo(() => {
    return HISTORY.filter((h) => {
      if (state !== "all" && h.confidence !== state) return false;
      if (system !== "all" && !h.systems.some((x) => x.toLowerCase().includes(system.toLowerCase()))) return false;
      if (law !== "all" && !h.lawIds.includes(law)) return false;
      if (!needle) return true;
      const blob = [h.id, h.event, h.change, h.why, h.systems.join(" "), h.conceptIds.join(" ")].join(" ").toLowerCase();
      return blob.includes(needle);
    });
  }, [state, system, law, needle]);

  const artefacts = useMemo(() => {
    return ARTEFACTS.filter((a) => {
      if (state !== "all" && a.verification !== state) return false;
      if (system !== "all" && !a.system.toLowerCase().includes(system.toLowerCase())) return false;
      if (law !== "all" && !a.relatedLawIds.includes(law)) return false;
      if (!needle) return true;
      const blob = [a.id, a.artefact, a.system, a.notes, a.sourceLocation].join(" ").toLowerCase();
      return blob.includes(needle);
    });
  }, [state, system, law, needle]);

  const gaps = useMemo(() => {
    return EVIDENCE_GAPS.filter((g) => {
      if (state !== "all" && g.status !== state) return false;
      if (law !== "all" && !g.relatedLawIds.includes(law)) return false;
      if (!needle) return true;
      return [g.id, g.title, g.whyItMatters].join(" ").toLowerCase().includes(needle);
    });
  }, [state, law, needle]);

  const reviews = useMemo(() => {
    return LEDGER_REVIEWS.filter((r) => {
      if (state !== "all" && r.currentConfidence !== state && r.recommendedConfidence !== state) return false;
      if (r.recommendedAction === "keep" && state === "all" && !needle && law === "all") return true;
      const h = historyById(r.historyId);
      if (law !== "all" && h && !h.lawIds.includes(law)) return false;
      if (system !== "all" && h && !h.systems.some((x) => x.toLowerCase().includes(system.toLowerCase()))) return false;
      if (!needle) return true;
      return [r.historyId, r.overreadRisk, r.verifiedClaims.join(" "), h?.event ?? ""].join(" ").toLowerCase().includes(needle);
    });
  }, [state, system, law, needle]);

  const flagged = LEDGER_REVIEWS.filter((r) => r.recommendedAction !== "keep");
  const partialIncidents = INCIDENTS.filter((i) => i.epistemic !== "verified" || i.evidence.some((e) => e.status === "incomplete"));
  const liveUnknowns = PROVENANCE.filter((p) => p.confidence === "incomplete");

  return (
    <div className="min-w-0 space-y-10">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl tracking-tight">Confidence audit</h1>
        <p className="mt-3 text-mute leading-relaxed">
          Epistemic transparency for the historical record. Live host re-probe this campaign:{" "}
          <span className="font-mono text-accent">{LIVE_HOST_PROBE}</span>. Capture {EVIDENCE_CAPTURE_UTC}.
          GitHub HEAD is not deployed SHA. UNKNOWN stays UNKNOWN.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat n={ARTEFACTS.length} label="artefacts in the manifest" />
        <Stat n={EVIDENCE_GAPS.length} label="open evidence gaps" />
        <Stat n={flagged.length} label="ledger rows flagged for review" />
        <Stat n={liveUnknowns.length} label="live provenance cells incomplete" />
      </section>

      <FilterBar
        q={q}
        setQ={setQ}
        state={state}
        setState={setState}
        system={system}
        setSystem={setSystem}
        systems={systems}
        law={law}
        setLaw={setLaw}
      />

      <section>
        <h2 className="font-display text-2xl">Unresolved evidence gaps</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Missing artefacts, live UNKNOWNs, incidents with partial proof, rows awaiting a human. Closing a gap
          requires an artefact, not a repeated sentence.
        </p>
        <ul className="mt-4 space-y-3">
          {gaps.map((g) => (
            <li key={g.id} id={g.id} className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl">{g.title}</h3>
                <span className="font-mono text-xs text-accent">
                  {g.kind} · <Epistemic status={g.status} />
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{g.whyItMatters}</p>
              <p className="mt-2 text-sm text-accent">To close. {g.whatWouldCloseIt}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl">Rows awaiting human review</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Git/document-backed historical QA is complete. The list emphasises recommended action other than keep
          (live-host blocks), then the rest matching the filter.
        </p>
        <ol className="mt-4 space-y-3">
          {[...reviews].sort((a, b) => Number(a.recommendedAction === "keep") - Number(b.recommendedAction === "keep")).map((rv) => {
            const h = historyById(rv.historyId);
            return (
              <li key={rv.historyId} className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <a href={`/history#${rv.historyId}`} className="font-display text-lg text-ink no-underline hover:text-accent">
                    {h?.event ?? rv.historyId}
                  </a>
                  <span className="font-mono text-xs text-accent">{rv.recommendedAction}</span>
                </div>
                <p className="mt-1 text-xs text-mute">
                  current <Epistemic status={rv.currentConfidence} /> → recommended{" "}
                  <Epistemic status={rv.recommendedConfidence} />
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="text-mute">Over-read risk. </span>
                  {rv.overreadRisk}
                </p>
                {rv.openQuestions.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-mute">
                    {rv.openQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl">Incidents with partial proof</h2>
        <ul className="mt-4 space-y-2">
          {(partialIncidents.length ? partialIncidents : INCIDENTS.filter((i) => i.id === "inc-materialization" || i.id === "inc-volume-loss" || i.id === "inc-deployed-sha")).map(
            (i) => (
              <li key={i.id} className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <IncidentLink id={i.id} />
                <p className="mt-2 text-sm text-mute">
                  Epistemic <Epistemic status={i.epistemic} />. Residual: {i.residualRisk}
                </p>
              </li>
            ),
          )}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl">Live provenance cells</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Four identities that are not the same object: checkout HEAD, origin/main, deployed SHA/image, running
          process. Inventory SHAs from 2026-08-22 are labelled inventory, not live.
        </p>
        <div className="mt-4 max-w-full min-w-0 overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.14em] text-mute">
                <th className="py-2 pr-3">System</th>
                <th className="py-2 pr-3">Deployed SHA</th>
                <th className="py-2 pr-3">Scheduler</th>
                <th className="py-2 pr-3">Backup</th>
                <th className="py-2">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {PROVENANCE.map((p) => (
                <tr key={p.id} className="border-t border-line align-top">
                  <td className="py-2 pr-3 font-medium">{p.system}</td>
                  <td className="max-w-[12rem] py-2 pr-3 break-words text-mute">{clip(p.deployedSha)}</td>
                  <td className="max-w-[12rem] py-2 pr-3 break-words text-mute">{clip(p.schedulerState)}</td>
                  <td className="max-w-[12rem] py-2 pr-3 break-words text-mute">{clip(p.backupState)}</td>
                  <td className="py-2">
                    <Epistemic status={p.confidence} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl">History matching this filter</h2>
        <ol className="mt-4 space-y-2">
          {historyHits.map((h) => (
            <li key={h.id} className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a href={`/history#${h.id}`} className="font-display text-lg text-ink no-underline hover:text-accent">
                  {h.event}
                </a>
                <span className="font-mono text-xs text-accent">{h.date}</span>
              </div>
              <p className="mt-1 text-xs text-mute">{h.systems.join(" · ")}</p>
              <Epistemic status={h.confidence} />
              {h.lawIds.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-2 text-sm">
                  {h.lawIds.map((id) => (
                    <LawLink key={id} id={id} />
                  ))}
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl">Preserved artefacts</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Canonical inventory: docs/EVIDENCE_PRESERVATION_MANIFEST.md. Hashes are SHA-256 of the preserved copy.
          Unit files are templates. Off-host copy = yes means this Handbook git tree, not a durable Clank DB
          backup.
        </p>
        <ul className="mt-4 space-y-3">
          {artefacts.map((a) => (
            <li key={a.id} id={a.id} className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg">
                  {a.system} / {a.artefact}
                </h3>
                <span className="font-mono text-xs text-accent">
                  {a.artefactType} · {a.retentionRisk}
                </span>
              </div>
              <p className="mt-1 break-all font-mono text-xs text-mute">{a.sourceLocation}</p>
              <p className="mt-2 text-sm leading-relaxed">{a.notes}</p>
              {a.hash && <p className="mt-2 break-all font-mono text-xs text-mute">sha256:{a.hash}</p>}
              <p className="mt-1 text-xs text-mute">
                off-host {a.offHostCopy} · <Epistemic status={a.verification} />
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl">What should happen next</h2>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Ranked by impact and urgency. Do-now items need artefacts, not a prettier sentence.
        </p>
        <ol className="mt-4 space-y-3">
          {NEXT_STEPS.filter((s) => s.doNow).map((s) => (
            <li key={s.id} className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg">{s.title}</h3>
                <span className="font-mono text-xs text-accent">
                  {s.impact} · {s.urgency} · {s.scope}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{s.body}</p>
              <p className="mt-1 text-xs text-mute">Depends on. {s.dependency}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-6 font-display text-xl">Do not do yet</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
          {DO_NOT_DO_YET.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-mute">
        Human ledger:{" "}
        <Link to="/history" className="text-accent">
          History
        </Link>
        . Current Clanks:{" "}
        <Link to="/fleet" className="text-accent">
          Fleet
        </Link>
        .
      </p>
    </div>
  );
}

function clip(s: string) {
  return s.length > 140 ? `${s.slice(0, 137)}…` : s;
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="font-display text-3xl">{n}</div>
      <div className="text-sm text-mute">{label}</div>
    </div>
  );
}

function FilterBar({
  q,
  setQ,
  state,
  setState,
  system,
  setSystem,
  systems,
  law,
  setLaw,
}: {
  q: string;
  setQ: (v: string) => void;
  state: (typeof STATES)[number];
  setState: (v: (typeof STATES)[number]) => void;
  system: string;
  setSystem: (v: string) => void;
  systems: string[];
  law: string;
  setLaw: (v: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <p className="text-xs uppercase tracking-[0.14em] text-mute">Filter by concept, Clank, date wording, law, or epistemic state</p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search concepts, Clanks, dates, laws, artefacts"
        className="w-full rounded-md bg-bg px-3 py-3 text-ink"
        aria-label="Search evidence"
      />
      <div className="flex flex-wrap gap-2">
        {STATES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setState(s)}
            className={`min-h-11 rounded-md px-3 py-2 text-sm ${state === s ? "bg-accent text-bg" : "bg-bg text-mute"}`}
          >
            {s === "all" ? "all states" : s}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-xs uppercase tracking-[0.14em] text-mute">Clank / system</span>
          <select
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            className="mt-1 w-full rounded-md bg-bg px-3 py-3 text-ink"
          >
            <option value="all">all systems</option>
            {systems.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-xs uppercase tracking-[0.14em] text-mute">Fleet law</span>
          <select
            value={law}
            onChange={(e) => setLaw(e.target.value)}
            className="mt-1 w-full rounded-md bg-bg px-3 py-3 text-ink"
          >
            <option value="all">all laws</option>
            {LAWS.map((l) => (
              <option key={l.id} value={l.id}>
                Law {l.number}: {l.title}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
