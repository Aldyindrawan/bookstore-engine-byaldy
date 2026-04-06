import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Delivery() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg container mx-auto pt-28 pb-10 px-4 min-h-screen dark:bg-slate-900 dark:text-white">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-pink-500">Status Pengiriman</h1>
          <p className="mt-2 opacity-70">Pesanan Anda sedang kami siapkan dengan cinta ❤️</p>
        </div>

        {/* TRACKING CARD */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl border dark:border-slate-700 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm opacity-60">No. Resi:</p>
              <p className="font-mono font-bold text-blue-500 uppercase">BKSTR-2026-ALDY99</p>
            </div>
            <div className="badge badge-primary p-4 text-white">Sedang Dikemas</div>
          </div>

          {/* STEPPER UI */}
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary text-sm">Pembayaran Berhasil</li>
            <li className="step step-primary text-sm font-bold">Sedang Dikemas</li>
            <li className="step text-sm opacity-50">Dalam Perjalanan</li>
            <li className="step text-sm opacity-50">Pesanan Diterima</li>
          </ul>

          <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-700/30 rounded-xl border-l-4 border-pink-500">
            <h3 className="font-bold flex items-center gap-2">
              📦 Update Terakhir:
            </h3>
            <p className="text-sm mt-2">
              "Bukti transfer telah divalidasi. Buku sedang disortir dan dipacking menggunakan bubble wrap tebal."
            </p>
            <p className="text-[10px] mt-2 opacity-50">07 April 2026, 03:45 WIB</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/" className="btn btn-outline flex-1 border-pink-500 text-pink-500 hover:bg-pink-500 hover:border-pink-500">
              Belanja Lagi
            </Link>
            <button 
              onClick={() => window.print()} 
              className="btn btn-primary flex-1 text-white"
            >
              Cetak Invoice
            </button>
          </div>
        </div>

        {/* ESTIMASI AREA */}
        <div className="mt-10 text-center">
            <p className="text-sm opacity-60 italic">Estimasi sampai: 2-3 Hari Kerja</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Delivery;