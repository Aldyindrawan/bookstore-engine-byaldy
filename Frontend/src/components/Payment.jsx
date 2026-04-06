import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Payment() {
  const [file, setFile] = useState(null);
  const [total, setTotal] = useState("0");
  const [authUser] = useAuth();

  useEffect(() => {
    // Ambil total harga yang disimpan saat checkout
    const savedTotal = localStorage.getItem("lastOrderTotal");
    if (savedTotal) setTotal(savedTotal);
  }, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    
    if (!file) {
      return toast.error("Silakan upload bukti transfer dulu!");
    }

    try {
      // 1. BERSIHKAN DATABASE (Hapus semua item keranjang milik user ini)
      if (authUser?.email) {
        await axios.delete(`http://localhost:4001/cart/all/${authUser.email}`);
      }

      // 2. BERSIHKAN LOCAL STORAGE
      localStorage.removeItem("lastOrderTotal");

      // 3. UPDATE NAVBAR (Supaya angka keranjang langsung jadi 0)
      window.dispatchEvent(new Event("cartUpdate"));

      // 4. NOTIFIKASI & REDIRECT KE DELIVERY
      toast.success("Pembayaran Berhasil! Mengalihkan ke status pengiriman...", {
        duration: 4000,
        position: "top-center",
      });

      setTimeout(() => {
        window.location.href = "/delivery"; // <--- SEKARANG PINDAH KE DELIVERY
      }, 2500);

    } catch (error) {
      console.error("Gagal mengosongkan keranjang:", error);
      toast.error("Terjadi kesalahan, namun bukti Anda tetap kami proses.");
      
      // Tetap redirect agar user bisa melihat status pengiriman
      setTimeout(() => { window.location.href = "/delivery"; }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-md container mx-auto pt-28 pb-10 px-4 min-h-screen dark:bg-slate-900 dark:text-white">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl border dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Konfirmasi Pembayaran BNI</h2>
          
          <div className="bg-blue-50 dark:bg-slate-700/50 p-6 rounded-lg mb-6 text-center border border-blue-100 dark:border-slate-600">
            <p className="text-sm opacity-70">Total Tagihan:</p>
            <p className="text-4xl font-bold text-pink-500 my-2">Rp {total}</p>
            <div className="divider opacity-50 text-xs">TRANSFER KE</div>
            <p className="text-lg font-semibold">Bank BNI</p>
            <p className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 my-2">1655172149</p>
            <p className="font-medium">a.n Aldy (bookStore)</p>
          </div>

          <form onSubmit={handleConfirm} className="space-y-6">
            <div className="form-control">
              <label className="label font-medium">Upload Bukti Transfer:</label>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} 
                className="file-input file-input-bordered file-input-primary w-full" 
                accept="image/*" 
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-full text-white shadow-lg shadow-blue-500/20"
            >
              Konfirmasi & Lihat Status Pengiriman
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;