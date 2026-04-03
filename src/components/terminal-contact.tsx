"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function TerminalContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    
    // Static-compatible transition to the user's email client
    const mailtoUrl = `mailto:mirzozoddaabubakr@gmail.com?subject=Portfolio Inquiry from ${email}&body=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus("success");
    }, 800);
  };

  return (
    <div className="w-[85vw] md:w-[350px] font-mono pointer-events-auto text-left mr-0 md:ml-auto backdrop-blur-md bg-white/5 p-6 border border-white/10 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[0.55rem] tracking-[0.2em] text-[#00ffff] uppercase animate-pulse">
            SECURE_LINK // ACTIVE
        </div>
        <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#ff00ff]/60" />
            <div className="w-2 h-2 rounded-full bg-[#00ffff]" />
        </div>
      </div>
      
      {status === "success" ? (
        <div className="py-8 text-center border border-dashed border-[#00ffff]/40 bg-[#00ffff]/5">
            <div className="text-[#00ffff] text-lg mb-2">✓</div>
            <div className="text-[0.6rem] text-white tracking-widest uppercase">TRANSMISSION_DELIVERED</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative group">
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="ENTER_SENDER_NODE // EMAIL"
              className="w-full bg-black/40 border border-white/10 p-3 text-[0.65rem] text-white tracking-widest outline-none transition-colors focus:border-[#00ffff]/60 placeholder:text-white/20"
            />
            <div className="absolute top-0 left-0 w-[2px] h-full bg-[#ff00ff] scale-y-0 group-focus-within:scale-y-100 transition-transform origin-top" />
          </div>
          
          <div className="relative group">
            <textarea 
              name="message" 
              required 
              rows={4} 
              placeholder="INPUT_DATA // MESSAGE"
              className="w-full bg-black/40 border border-white/10 p-3 text-[0.65rem] text-white tracking-widest outline-none resize-none transition-colors focus:border-[#00ffff]/60 placeholder:text-white/20"
            />
            <div className="absolute top-0 left-0 w-[2px] h-full bg-[#ff00ff] scale-y-0 group-focus-within:scale-y-100 transition-transform origin-top" />
          </div>
          
          <button 
            type="submit" 
            disabled={status === "sending"}
            className={cn(
                "mt-2 w-full p-3 font-bold text-[0.65rem] tracking-[0.3em] uppercase transition-all duration-300 relative overflow-hidden group",
                status === "sending" ? "bg-white/10 text-white/50 cursor-not-allowed" : "bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/30 hover:bg-[#00ffff] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            )}
          >
            {status === "sending" ? "UPLOADING..." : "INITIATE_TRANSMISSION"}
            
            {/* Scanline hover effect */}
            <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-white group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
          </button>
          
          {status === "error" && (
            <div className="text-[0.55rem] text-red-500 tracking-widest text-center mt-2 uppercase">
              SYS.ERR: CONNECTION_FAILED
            </div>
          )}
        </form>
      )}
    </div>
  );
}
