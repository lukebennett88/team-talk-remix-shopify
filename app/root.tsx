import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Footer } from "./components/footer";
import { Header } from "./components/header";
import globalStylesheetHref from "./styles/app.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesheetHref }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Headless Shopify with Remix",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
