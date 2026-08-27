import { createFileRoute } from "@tanstack/react-router";
import { EXPLAIN_PROMPTS } from "@/content/catalog";
import { ExplainBack } from "@/components/handbook/explain-back";

export const Route = createFileRoute("/explain")({ component: Page });

function Page() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl tracking-tight">Explain it back</h1>
      <p className="max-w-2xl text-mute">
        Freeze an answer, then reveal a model explanation. There is no LLM grader. Self-rating and
        the checklist are the whole assessment.
      </p>
      {EXPLAIN_PROMPTS.map((p) => (
        <ExplainBack key={p.id} prompt={p} />
      ))}
    </div>
  );
}
