import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { INCIDENTS } from "@/content/catalog";

export const Route = createFileRoute("/labs")({ component: Page });

const STARTER = ["inc-materialization", "inc-qc", "inc-bankai"];

function Page() {
  return (
    <div className="space-y-6">
      <Outlet />
    </div>
  );
}

export function LabsIndex() {
  const starters = INCIDENTS.filter((i) => STARTER.includes(i.id));
  const rest = INCIDENTS.filter((i) => !STARTER.includes(i.id));
  return (
    <>
      <h1 className="font-display text-4xl tracking-tight">Investigation labs</h1>
      <p className="max-w-2xl text-mute">
        Worlds-style freeze-before-reveal, but the physics is history, not a simulator. Do not invent
        a cause that the locker does not support. Start with the original three; the rest teach
        different planes.
      </p>
      <h2 className="mt-8 font-display text-2xl">Start here</h2>
      <LabList items={starters} />
      <h2 className="mt-8 font-display text-2xl">Further cases</h2>
      <LabList items={rest} />
    </>
  );
}

function LabList({ items }: { items: typeof INCIDENTS }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((inc) => (
        <li key={inc.id}>
          <Link to="/labs/$incidentId" params={{ incidentId: inc.id }} className="text-accent no-underline hover:underline">
            {inc.title}
          </Link>
          <span className="ml-2 text-sm text-mute">
            {inc.complexity} · {inc.dateRange}
          </span>
        </li>
      ))}
    </ul>
  );
}
