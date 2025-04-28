// app/routes/__root.tsx
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "@/styles/app.css?url";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header/header";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "CV Analyzer",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  );
}
