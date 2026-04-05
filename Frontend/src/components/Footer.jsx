import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded dark:bg-slate-900 dark:text-white border-t">
      <nav className="grid grid-flow-col gap-6 text-md font-medium">
        <a 
          href="https://github.com/Aldyindrawan" 
          target="_blank" 
          className="link link-hover hover:text-pink-500 duration-300"
        >
          GitHub
        </a>
        <a 
          href="https://instagram.com/idrwnaldy_" 
          target="_blank" 
          className="link link-hover hover:text-pink-500 duration-300"
        >
          Instagram
        </a>
        <a 
          href="https://wa.me/6285712734695" 
          target="_blank" 
          className="link link-hover hover:text-pink-500 duration-300"
        >
          WhatsApp
        </a>
        <span className="opacity-30 cursor-not-allowed">LinkedIn (Soon)</span>
      </nav>
      
      <nav>
        <div className="grid grid-flow-col gap-4">
          {/* Kamu bisa simpan ikon sosial media di sini jika ada */}
        </div>
      </nav>
      
      <aside className="space-y-2">
        <p className="text-lg">
          Crafted with ☕ and <span className="text-pink-500 font-bold italic">Late Nights</span>
        </p>
        <p className="font-semibold text-pink-500">
          by Aldy Indrawan
        </p>
        <div className="text-xs opacity-60">
          <p>IT Student | Fullstack Developer Enthusiast</p>
          <p>Copyright © 2026 - All right reserved</p>
        </div>
      </aside>
    </footer>
  );
}

export default Footer;