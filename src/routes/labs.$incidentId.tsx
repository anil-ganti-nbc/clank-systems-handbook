import { createFileRoute, Link } from "@tanstack/react-router";
import { incidentById } from "@/content/catalog";
import { InvestigationLab } from "@/components/handbook/investigation";

export const Route = createFileRoute("/labs/$incidentId")({ component: LabCase });

function LabCase() {
  const { incidentId } = Route.useParams();
  const incident = incidentById(incidentId);
  if (!incident) {
    return (
      <p>
        Unknown case. <Link to="/labs">Back</Link>
      </p>
    );
  }
  return (
    <div>
      <Link to="/labs" className="text-sm text-mute no-underline hover:text-ink">
        ← Labs
      </Link>
      <div className="mt-4">
        <InvestigationLab incident={incident} />
      </div>
    </div>
  );
}
