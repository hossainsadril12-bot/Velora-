import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaboration | Velora — Eiman Estates",
  description:
    "Velora Inani is designed by HuaDu Architecture & Urban Design (HDD), a Shanghai-based firm with a first-rate qualification from China's State Construction Ministry and projects across three continents.",
  openGraph: {
    title: "Collaboration | Velora — Eiman Estates",
    description:
      "Velora Inani is designed by HuaDu Architecture & Urban Design (HDD), a Shanghai-based firm with a first-rate qualification from China's State Construction Ministry and projects across three continents.",
    url: "https://velora.eimanestates.com/collaboration",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
