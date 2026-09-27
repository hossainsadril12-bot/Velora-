"use client";

import { usePathname } from "next/navigation";
import FloatingSocial from "@/components/FloatingSocial";
import MusicToggle from "@/components/MusicToggle";

export default function FloatingControls() {
  const pathname = usePathname();
  // The floating music and social buttons belong to the homepage only.
  if (pathname !== "/") return null;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-row items-end gap-3">
      <MusicToggle />
      <FloatingSocial />
    </div>
  );
}
