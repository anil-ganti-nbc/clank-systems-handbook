import { createFileRoute } from "@tanstack/react-router";
import { LabsIndex } from "./labs";

export const Route = createFileRoute("/labs/")({ component: LabsIndex });
