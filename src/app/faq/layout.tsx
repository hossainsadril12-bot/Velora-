import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Velora — Eiman Estates",
  description:
    "Answers to common questions about unit ownership, legal deed registration, profit sharing, personal use, transfers, and the equity model at Velora Inani.",
  openGraph: {
    title: "FAQ | Velora — Eiman Estates",
    description:
      "Answers to common questions about unit ownership, legal deed registration, profit sharing, personal use, transfers, and the equity model at Velora Inani.",
    url: "https://velora.eimanestates.com/faq",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
