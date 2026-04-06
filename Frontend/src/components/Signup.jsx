import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "./Login";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Berhasil! ✨");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || "Gagal daftar"));
    }
  };

  return (
    // Wrapper utama: Pakai bg-slate-950 (Hitam pekat) agar tidak putih
    <div className="flex h-screen items-center justify-center bg-slate-950 text-white transition-all duration-500">
      {/* Kotak Form: Pakai bg-slate-900 (Gelap) */}
      <div className="w-[450px] p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900 border border-slate-800 relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tombol Close */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400 hover:text-white"
          >
            ✕
          </Link>

          <h3 className="font-bold text-3xl text-pink-500 mb-8 italic text-center">
            Daftar Akun
          </h3>

          <div className="space-y-6">
            {/* Fullname */}
            <div className="space-y-2">
              <span className="text-slate-400 text-sm ml-1">Nama Lengkap</span>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-slate-500"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <p className="text-xs text-red-500 italic mt-1 ml-1">Wajib diisi!</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <span className="text-slate-400 text-sm ml-1">Email</span>
              <input
                type="email"
                placeholder="email@contoh.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-slate-500"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-xs text-red-500 italic mt-1 ml-1">Email jangan kosong!</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <span className="text-slate-400 text-sm ml-1">Password</span>
              <input
                type="password"
                placeholder="Buat password aman"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none text-white focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-slate-500"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-xs text-red-500 italic mt-1 ml-1">Password wajib ada!</p>}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-700 shadow-lg active:scale-95 transition-all">
              Signup Sekarang
            </button>
            <p className="text-center text-sm text-slate-400">
              Sudah punya akun?{" "}
              <button
                type="button"
                className="text-pink-400 underline font-bold hover:text-pink-300"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            </p>
          </div>
        </form>
        {/* Modal Login tetap dipanggil tapi tidak terlihat sampai tombol diklik */}
        <Login />
      </div>
    </div>
  );
}

export default Signup;