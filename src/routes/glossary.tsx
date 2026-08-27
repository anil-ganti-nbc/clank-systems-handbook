import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { CONCEPTS } from "@/content/catalog";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/glossary")({
  validateSearch: (s) => searchSchema.parse(s),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  const [term, setTerm] = useState(q ?? "");
  const list = useMemo(() => {
    const needle = term.trim().toLowerCase();
    if (!needle) return CONCEPTS;
    return CONCEPTS.filter(
      (c) =>
        c.term.toLowerCase().includes(needle) ||
        c.definition.toLowerCase().includes(needle) ||
        c.id.includes(needle),
    );
  }, [term]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl tracking-tight">Glossary</h1>
      <p className="text-mute">Reference layer. Each term has a definition, a Clank example, and a human sentence.</p>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search concepts"
        className="w-full max-w-md rounded-md bg-paper px-3 py-2"
      />
      <ul className="space-y-4">
        {list.map((c) => (
          <li id={c.id} key={c.id} className="rounded-xl bg-paper p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <h2 className="font-display text-xl">{c.term}</h2>
            <p className="mt-2 text-sm">
              <span className="text-mute">Definition. </span>
              {c.definition}
            </p>
            <p className="mt-2 text-sm">
              <span className="text-mute">Clank example. </span>
              {c.clankExample}
            </p>
            <p className="mt-2 text-sm">
              <span className="text-mute">To a human. </span>
              {c.explainToHuman}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
