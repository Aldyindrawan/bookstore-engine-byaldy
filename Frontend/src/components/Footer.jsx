import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center p-14 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
      
      {/* Ornamen Halus agar tidak flat */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>

      <nav className="grid grid-flow-col gap-8 text-sm font-bold tracking-widest uppercase">
        <a 
          href="https://github.com/Aldyindrawan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-pink-500 duration-300 transition-colors"
        >
          GitHub
        </a>
        <a 
          href="https://instagram.com/idrwnaldy_" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-pink-500 duration-300 transition-colors"
        >
          Instagram
        </a>
        <a 
          href="https://wa.me/6285712734695" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-pink-500 duration-300 transition-colors"
        >
          WhatsApp
        </a>
        <span className="opacity-20 cursor-not-allowed select-none">LinkedIn</span>
      </nav>
      
      <aside className="mt-8 space-y-4">
        {/* Slogan Ikonik */}
        <div className="space-y-1">
          <p className="text-lg md:text-xl font-medium text-slate-300">
            Crafted with <span className="animate-pulse">☕</span> and <span className="text-blue-400 font-bold italic">Late Nights</span>
          </p>
          
          {/* Nama dengan Gradasi ala Arsitek */}
          <h3 className="text-xl md:text-2xl font-black tracking-tighter">
            by <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
              Aldy Indrawan
            </span>
          </h3>
        </div>

        {/* Metadata & Copyright */}
        <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-slate-500 font-mono">
          <p className="mb-1">IT Student | Fullstack Developer Enthusiast</p>
          <p className="opacity-50">Copyright © 2026 — All rights reserved</p>
        </div>
      </aside>

    </footer>
  );
}

export default Footer;