import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Environment | Velora — Eiman Estates",
  description:
    "Velora Inani is built on green practices, smart energy management, water conservation strategies, and responsible waste management — sustainable luxury by design.",
  openGraph: {
    title: "Environment | Velora — Eiman Estates",
    description:
      "Velora Inani is built on green practices, smart energy management, water conservation strategies, and responsible waste management — sustainable luxury by design.",
    url: "https://velora.eimanestates.com/environment",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
