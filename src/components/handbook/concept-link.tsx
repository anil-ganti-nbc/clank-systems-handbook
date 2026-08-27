import { Link } from "@tanstack/react-router";
import { conceptById, incidentById, lawById } from "@/content/catalog";

export function ConceptLink({ id }: { id: string }) {
  const c = conceptById(id);
  if (!c) return <span className="text-bad">{id}</span>;
  return (
    <Link
      to="/glossary"
      search={{ q: c.term }}
      className="rounded-sm bg-paper px-1.5 py-0.5 font-medium text-accent no-underline hover:underline"
    >
      {c.term}
    </Link>
  );
}

export function ConceptList({ ids }: { ids: string[] }) {
  return (
    <p className="mt-3 flex flex-wrap gap-2 text-sm">
      {ids.map((id) => (
        <ConceptLink key={id} id={id} />
      ))}
    </p>
  );
}

export function LawLink({ id }: { id: string }) {
  const law = lawById(id);
  if (!law) return <span className="text-bad">{id}</span>;
  return (
    <a href={`/architecture#${law.id}`} className="rounded-sm bg-paper px-1.5 py-0.5 font-medium text-accent no-underline hover:underline">
      Law {law.number}
      {law.deferred ? " (deferred)" : ""}: {law.title}
    </a>
  );
}

export function IncidentLink({ id }: { id: string }) {
  const inc = incidentById(id);
  if (!inc) return <span className="text-bad">{id}</span>;
  return (
    <Link
      to="/labs/$incidentId"
      params={{ incidentId: inc.id }}
      className="rounded-sm bg-paper px-1.5 py-0.5 font-medium text-accent no-underline hover:underline"
    >
      {inc.title}
    </Link>
  );
}

export function Epistemic({ status }: { status: string }) {
  const label =
    status === "verified"
      ? "verified historical fact"
      : status === "inferred"
        ? "inferred interpretation"
        : status === "incomplete"
          ? "incomplete evidence"
          : "illustrative";
  return <span className="text-xs uppercase tracking-[0.14em] text-mute">{label}</span>;
}
