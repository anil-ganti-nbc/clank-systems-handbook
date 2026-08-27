import { useState } from "react";
import type { ExplainPrompt } from "@/lib/handbook/schema";
import { ConceptList } from "./concept-link";
import { completeExplain, freezeAnswer, loadHandbookState } from "@/lib/handbook/state";

export function ExplainBack({ prompt }: { prompt: ExplainPrompt }) {
  const prior = loadHandbookState().frozen[prompt.id] ?? "";
  const [draft, setDraft] = useState(prior);
  const [frozen, setFrozen] = useState(Boolean(prior));
  const [revealed, setRevealed] = useState(false);
  const [rating, setRating] = useState(3);

  return (
    <article className="rounded-xl bg-paper p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <h2 className="font-display text-xl">{prompt.prompt}</h2>
      <textarea
        className="mt-4 min-h-32 w-full rounded-md bg-bg p-3 text-sm"
        value={draft}
        disabled={frozen}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Write it as you would say it out loud."
      />
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={frozen || draft.trim().length < 20}
          className="rounded-md bg-accent px-3 py-2 text-sm text-bg disabled:opacity-40"
          onClick={() => {
            freezeAnswer(prompt.id, draft);
            setFrozen(true);
          }}
        >
          Freeze my answer
        </button>
        <button
          type="button"
          disabled={!frozen}
          className="rounded-md border border-line px-3 py-2 text-sm disabled:opacity-40"
          onClick={() => setRevealed(true)}
        >
          Show model explanation
        </button>
      </div>
      {revealed && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-xs tracking-[0.16em] text-mute uppercase">What I said</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm">{draft}</p>
          </div>
          <div>
            <h3 className="text-xs tracking-[0.16em] text-mute uppercase">Model explanation (not an LLM grade)</h3>
            <p className="mt-2 text-sm leading-relaxed">{prompt.modelAnswer}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
              {prompt.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <label className="mt-4 block text-sm">
              Self-rating (1–5)
              <input
                type="range"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 w-full"
              />
            </label>
            <button
              type="button"
              className="mt-2 rounded-md border border-line px-3 py-1 text-sm"
              onClick={() => completeExplain(prompt.id, rating)}
            >
              Save self-rating {rating}
            </button>
          </div>
        </div>
      )}
      <ConceptList ids={prompt.conceptIds} />
    </article>
  );
}
