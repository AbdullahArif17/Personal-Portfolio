import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#8b5cf6] mx-auto" />
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
} 