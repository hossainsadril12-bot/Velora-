import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Honourable Adviser | Velora — Eiman Estates",
  description:
    "Prof. Dr. M Shamim Z Bosunia — former Dean of Civil Engineering at BUET, President of BACE, and structural expert behind the Padma Bridge and Karnaphuli Tunnel.",
  openGraph: {
    title: "Honourable Adviser | Velora — Eiman Estates",
    description:
      "Prof. Dr. M Shamim Z Bosunia — former Dean of Civil Engineering at BUET, President of BACE, and structural expert behind the Padma Bridge and Karnaphuli Tunnel.",
    url: "https://velora.eimanestates.com/adviser",
    siteName: "Velora — Eiman Estates",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
