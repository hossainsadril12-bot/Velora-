import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Velora — Eiman Estates",
  description:
    "Eiman Estates Ltd. is a new-generation real estate developer driven by ethical practices and fair business policies. Discover the vision behind Velora Inani.",
  openGraph: {
    title: "About | Velora — Eiman Estates",
    description:
      "Eiman Estates Ltd. is a new-generation real estate developer driven by ethical practices and fair business policies. Discover the vision behind Velora Inani.",
    url: "https://velora.eimanestates.com/about",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
