"use client";

import FloatingSocial from "@/components/FloatingSocial";
import MusicToggle from "@/components/MusicToggle";

export default function FloatingControls() {
  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-row items-end gap-3">
      <MusicToggle />
      <FloatingSocial />
    </div>
  );
}
