import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />
      {/* Container Utama dengan efek Radial Gradient untuk vibe 'Angkasa' */}
      <div className="relative overflow-hidden bg-slate-900 text-white min-h-screen">
        
        {/* --- ORNAMEN BINTANG & NEON --- */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 opacity-30" 
               style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
          </div>
        </div>

        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 relative z-10">
          
          {/* --- SECTION 1: HERO QUOTE (The Masterpiece Section) --- */}
          <div className="pt-32 pb-10 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              <span className="text-white">Arsitek Dunia Digital</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-blue-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                Dimulai dari Sini. 🚀
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto space-y-4">
               <p className="text-xl md:text-2xl font-medium text-slate-300 italic">
                "Jadikan setiap <span className="text-pink-500 font-bold">Bug</span> sebagai saksi bisu perjuanganmu. Karena mahakarya tidak lahir dari kode yang langsung running, tapi dari ketangguhanmu memperbaiki yang error."
               </p>
               <div className="pt-6">
                  <span className="text-sm uppercase tracking-[0.4em] text-slate-500">Driven by Passion, Crafted for the Future</span>
                  <h2 className="text-2xl md:text-3xl font-mono mt-2 text-white">
                    — Special Crafted by <span className="text-pink-500 font-bold">Aldy Indrawan</span> —
                  </h2>
               </div>
            </div>
          </div>

          <div className="divider opacity-20 my-10"></div>

          {/* --- SECTION 2: BIODATA & VISUAL --- */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-10">
            {/* Bagian Teks */}
            <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold">
                Membangun Masa Depan Melalui <br />
                <span className="text-pink-500">Baris Kode & Imajinasi</span>
              </h3>
              <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                Halo! Saya <span className="font-semibold text-white">Aldy Indrawan</span>, seorang mahasiswa IT yang sedang mendalami dunia <span className="italic text-pink-400">Fullstack Development</span>. 
                Bagi saya, setiap aplikasi yang dibangun adalah sebuah karya seni yang menggabungkan logika algoritma dengan estetika antarmuka.
              </p>
              
              <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                <Link to="/course">
                  <button className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition duration-300 font-semibold shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transform">
                    Lihat Koleksi
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border border-slate-700 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition duration-300 hover:border-pink-500">
                    Contact Me
                  </button>
                </Link>
              </div>
            </div>

            {/* Bagian Visual */}
            <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center relative">
              <div className="absolute w-72 h-72 bg-pink-500 rounded-lg blur-[100px] opacity-20 pointer-events-none"></div>
              <div className="relative group p-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <img 
                  src="/aldy-profil.jpg" 
                  alt="Aldy Indrawan" 
                  className="relative w-full max-w-sm aspect-square object-cover rounded-2xl border border-slate-700 shadow-2xl transform group-hover:-rotate-2 transition duration-500"
                />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-pink-500 rounded-tr-2xl opacity-40 group-hover:scale-110 transition duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink-500 rounded-bl-2xl opacity-40 group-hover:scale-110 transition duration-500"></div>
              </div>
            </div>
          </div>

          {/* Bagian Skill */}
          <div className="mt-20 pb-20">
            <h2 className="text-2xl font-bold text-center mb-12 uppercase tracking-widest text-slate-400">
               Amunisi Teknologi 🛠️
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { title: "Frontend", desc: "React.js & Tailwind CSS" },
                { title: "Backend", desc: "Node.js & Express" },
                { title: "Database", desc: "MongoDB" },
                { title: "Tools", desc: "Git & VS Code" }
              ].map((skill, index) => (
                <div key={index} className="p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-pink-500/50 hover:bg-slate-800/50 transition duration-300 group">
                  <p className="font-bold text-pink-500 mb-2 group-hover:scale-110 transition">{skill.title}</p>
                  <p className="text-sm text-slate-400">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;