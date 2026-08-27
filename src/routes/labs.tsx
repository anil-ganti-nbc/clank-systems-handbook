import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { INCIDENTS } from "@/content/catalog";

export const Route = createFileRoute("/labs")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <Outlet />
    </div>
  );
}

export function LabsIndex() {
  return (
    <>
      <h1 className="font-display text-4xl tracking-tight">Investigation labs</h1>
      <p className="max-w-2xl text-mute">
        Worlds-style freeze-before-reveal, but the physics is history, not a simulator. Do not invent
        a cause that the locker does not support.
      </p>
      <ul className="mt-6 space-y-3">
        {INCIDENTS.map((inc) => (
          <li key={inc.id}>
            <Link to="/labs/$incidentId" params={{ incidentId: inc.id }} className="text-accent no-underline hover:underline">
              {inc.title}
            </Link>
            <span className="ml-2 text-sm text-mute">{inc.complexity}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
