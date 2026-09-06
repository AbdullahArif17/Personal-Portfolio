"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300"
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </button>
  );
} 