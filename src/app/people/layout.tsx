import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our People | Velora — Eiman Estates",
  description:
    "Eiman Estates is governed by industry dignitaries whose collective experience and judgement guide every investment partnership.",
  openGraph: {
    title: "Our People | Velora — Eiman Estates",
    description:
      "Eiman Estates is governed by industry dignitaries whose collective experience and judgement guide every investment partnership.",
    url: "https://velora.eimanestates.com/people",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
