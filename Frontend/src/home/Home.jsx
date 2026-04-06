import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      {/* --- WRAPPER UTAMA DENGAN EFEK ANGKASA --- */}
      <div className="relative overflow-hidden bg-slate-900 text-white min-h-screen">
        
        {/* Ornamen Background (Bintang & Glow) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cahaya Neon Pink di Kiri Atas */}
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]"></div>
          
          {/* Cahaya Neon Ungu di Kanan Bawah */}
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]"></div>
          
          {/* Partikel Bintang Halus */}
          <div 
            className="absolute inset-0 opacity-25" 
            style={{ 
              backgroundImage: `radial-gradient(circle, white 0.8px, transparent 0.8px)`, 
              backgroundSize: '80px 80px' 
            }}
          ></div>
        </div>

        {/* Konten Utama */}
        <div className="relative z-10">
          {/* Section Banner dengan sedikit padding top agar tidak tertutup Navbar */}
          <div className="pt-10">
             <Banner />
          </div>
          
          {/* Pembatas halus antar section */}
          <div className="container mx-auto px-4 md:px-20">
            <hr className="border-none h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent my-10" />
          </div>

          <div className="pb-20">
            <Freebook />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;