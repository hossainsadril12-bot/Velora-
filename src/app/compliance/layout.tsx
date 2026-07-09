import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance | Velora — Eiman Estates",
  description:
    "Velora Inani complies with BNBC 2020, the Building Construction Act, the Real Estate Development and Management Act, and all applicable laws of Bangladesh.",
  openGraph: {
    title: "Compliance | Velora — Eiman Estates",
    description:
      "Velora Inani complies with BNBC 2020, the Building Construction Act, the Real Estate Development and Management Act, and all applicable laws of Bangladesh.",
    url: "https://velora.eimanestates.com/compliance",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
