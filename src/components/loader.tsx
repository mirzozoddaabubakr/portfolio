"use client"

import { useState, useEffect } from "react"

export default function PercentageLoader() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleProgress = (e: any) => {
      const p = Math.round(e.detail);
      setProgress(p);
      if (p >= 100) {
        // Instant removal of loading state when 100% is reached
        setLoading(false);
      }
    };

    window.addEventListener('3d-progress', handleProgress);

    return () => {
      window.removeEventListener('3d-progress', handleProgress);
    };
  }, []);

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-10 transition-opacity duration-500">
      <div className="flex flex-col items-center gap-4">
        {/* Minimalist Numerical Counter */}
        <div className="text-[4rem] font-bold tracking-tighter text-white tabular-nums leading-none">
          {progress.toString().padStart(3, "0")}
        </div>
        
        {/* Simple Progress Bar - No Glow */}
        <div className="relative w-48 h-[1px] bg-white/10 mt-4 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Clean, simple label */}
        <div className="text-[0.6rem] font-medium tracking-[0.6em] text-white/40 uppercase mt-4">
            Loading...
        </div>
      </div>
    </div>
  )
}
