const STAGES = [
  "Idea",
  "Repo",
  "Implement",
  "Tests",
  "Commit",
  "Push",
  "Deploy",
  "Runtime",
  "Observe",
  "Audit",
  "Remediate",
  "Law",
];

export function Pipeline() {
  return (
    <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
      {STAGES.map((s, i) => (
        <li key={s} className="rounded-lg bg-paper p-3 text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <div className="mt-1 font-medium">{s}</div>
        </li>
      ))}
    </ol>
  );
}
