import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Velora — Eiman Estates",
  description:
    "Read the Velora Inani privacy policy — how Eiman Estates collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | Velora — Eiman Estates",
    description:
      "Read the Velora Inani privacy policy — how Eiman Estates collects, uses, and protects your personal information.",
    url: "https://velora.eimanestates.com/privacy-policy",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
