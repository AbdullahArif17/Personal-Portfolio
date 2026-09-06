import Link from "next/link";
import { Home } from "lucide-react";
import BackButton from "@/components/back-button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />

      <div className="text-center max-w-md relative z-10 border border-zinc-800 bg-[#070708] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b5cf6] mb-2">Error 404</p>
        <h1 className="text-7xl md:text-8xl font-black tracking-tight text-white mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-3">Page Not Found</h2>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist, has been removed, or was never here.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            >
              <Home className="h-4 w-4" />
              Go Home
            </button>
          </Link>
          <BackButton />
        </div>
      </div>
    </div>
  );
} 