import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useForm } from "react-hook-form";

function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    alert("Pesan terkirim ke sistem Arsitek! 🚀");
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white flex flex-col justify-center items-center p-4 pt-28 pb-12">
        
        {/* Ornamen Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
          
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, 
              backgroundSize: '70px 70px' 
            }}
          ></div>
        </div>

        {/* Card Form */}
        <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 transition-all hover:border-pink-500/30">
          
          {/* JUDUL BARU - GRADASI & LUCU */}
          <h1 className="text-3xl md:text-4xl font-black text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
            Bug Melanda? ⚡
          </h1>
          <p className="text-slate-400 text-center mb-8 text-sm italic">
            "Sintaksis merana? Mari kita debug bareng di sini."
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <span className="text-sm text-slate-300 font-medium ml-1">Name</span>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 mt-1 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-slate-500 text-white"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1 ml-1 italic">Nama wajib diisi!</p>}
            </div>

            <div>
              <span className="text-sm text-slate-300 font-medium ml-1">Email</span>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full px-4 py-3 mt-1 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-slate-500 text-white"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-1 italic">Email jangan kosong!</p>}
            </div>

            <div>
              <span className="text-sm text-slate-300 font-medium ml-1">Message</span>
              <textarea 
                placeholder="Ada error apa hari ini?" 
                rows="4"
                className="w-full px-4 py-3 mt-1 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none placeholder:text-slate-500 text-white"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && <p className="text-xs text-red-500 mt-1 ml-1 italic">Pesan belum ditulis!</p>}
            </div>

            <button className="w-full bg-pink-500 text-white font-bold py-4 rounded-2xl hover:bg-pink-600 transition-all active:scale-95 shadow-lg shadow-pink-500/30 mt-2">
              Send Message
            </button>
          </form>

          {/* SIGNATURE DI BAWAH BUTTON */}
          <p className="text-[10px] text-center mt-6 text-slate-500 tracking-[0.3em] uppercase font-mono">
            — Support by Aldy Indrawan —
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;