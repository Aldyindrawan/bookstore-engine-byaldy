import React from "react";
import banner from "/Banner.png"; 
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 relative">
        
        {/* TEKS & KONTEN */}
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36 relative z-10">
          <div className="space-y-8">
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
              Temukan Insight Baru & <br />
              Kuasai Baris Kode{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                Setiap Hari! 🚀
              </span>
            </h1>
            
            <p className="text-base md:text-lg leading-relaxed text-slate-300 max-w-xl">
              Gak perlu pusing sendirian ngadepin bug. Di sini, kami sedia 
              amunisi literasi pilihan buat kamu yang ingin bertransformasi 
              dari sekadar <span className="text-white font-semibold">'tukang ketik'</span> jadi <span className="text-pink-500 font-bold italic text-shadow-glow">arsitek sistem</span> yang handal. 
            </p>

            {/* INPUT DENGAN EFEK GLASSMORPHISM */}
            <div className="max-w-md">
              <label className="input bg-slate-800/40 backdrop-blur-md border-slate-700 flex items-center gap-2 rounded-2xl focus-within:border-pink-500 transition-all p-4 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5 text-pink-500 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input 
                  type="text" 
                  className="grow bg-transparent outline-none text-white placeholder:text-slate-500 text-sm" 
                  placeholder="Masukan email biar gak ketinggalan update..." 
                />
              </label>
            </div>
          </div>
          
          <button 
            onClick={() => navigate("/course")} 
            className="mt-10 px-10 py-4 bg-pink-500 text-white font-black rounded-full hover:bg-pink-600 hover:scale-105 transition-all duration-300 shadow-[0_10px_20px_rgba(236,72,153,0.3)] uppercase tracking-wider text-sm"
          >
            Mulai Belajar Sekarang
          </button>
        </div>
        
        {/* ILUSTRASI DENGAN EFEK GLOW */}
        <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center items-center relative">
          {/* Efek Cahaya di belakang gambar */}
          <div className="absolute w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[100px] animate-pulse"></div>
          
          <img
            src={banner}
            className="relative z-10 md:w-[550px] md:h-[460px] drop-shadow-[0_0_50px_rgba(236,72,153,0.15)] hover:drop-shadow-[0_0_60px_rgba(236,72,153,0.3)] transition-all duration-500"
            alt="Banner Bookstore"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;