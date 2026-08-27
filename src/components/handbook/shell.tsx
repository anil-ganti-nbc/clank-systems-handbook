import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { markVisited } from "@/lib/handbook/state";

const NAV = [
  { to: "/", label: "Overview", exact: true },
  { to: "/built", label: "How we built it" },
  { to: "/basics", label: "Development" },
  { to: "/systems", label: "Systems" },
  { to: "/architecture", label: "Architecture" },
  { to: "/incidents", label: "Incidents" },
  { to: "/labs", label: "Labs" },
  { to: "/explain", label: "Explain it back" },
  { to: "/glossary", label: "Glossary" },
];

export function HandbookShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    markVisited(pathname);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-bg text-ink" data-hydrated={hydrated ? "true" : "false"}>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="font-display text-lg tracking-tight text-ink no-underline">
            Clank Systems Handbook
          </Link>
          <p className="hidden text-xs text-mute sm:block">Evidence-backed literacy · not a glossary with a GUI</p>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`shrink-0 rounded-md px-3 py-2 text-sm no-underline ${active ? "bg-paper text-ink" : "text-mute hover:text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">{children}</main>
    </div>
  );
}
