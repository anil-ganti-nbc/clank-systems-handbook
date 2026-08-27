import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { HandbookShell } from "@/components/handbook/shell";
import appCss from "../styles.css?url";

const APP_NAME = "Clank Systems Handbook";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Evidence-backed engineering literacy for the Clank ecosystem.",
      },
      { name: "theme-color", content: "#0c0d10" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <HandbookShell>
          <Outlet />
        </HandbookShell>
        <Scripts />
      </body>
    </html>
  );
}
