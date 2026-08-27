import type { ErrorComponentProps } from "@tanstack/react-router";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="font-display text-lg">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-mute">
        {error.message || "An unexpected error occurred. Try reloading the page."}
      </p>
    </main>
  );
}
