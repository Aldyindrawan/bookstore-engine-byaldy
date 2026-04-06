import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };
    try {
      const res = await axios.post("http://localhost:4001/user/login", userInfo);
      if (res.data) {
        toast.success("Login Berhasil! 🚀");
        document.getElementById("my_modal_3").close();
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setTimeout(() => { window.location.href = "/"; }, 1000);
      }
    } catch (err) {
      toast.error("Gagal: " + (err.response?.data?.message || "Cek koneksi server"));
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}>✕</button>
            <h3 className="font-bold text-lg text-pink-500">Masuk ke bookStore</h3>
            <div className="mt-4 space-y-2">
              <span>Email</span><br />
              <input type="email" placeholder="Email" className="w-full px-3 py-1 border rounded-md outline-none dark:bg-slate-800" {...register("email", { required: true })} />
            </div>
            <div className="mt-4 space-y-2">
              <span>Password</span><br />
              <input type="password" placeholder="Password" className="w-full px-3 py-1 border rounded-md outline-none dark:bg-slate-800" {...register("password", { required: true })} />
            </div>
            <div className="flex justify-between mt-6">
              <button className="bg-pink-500 text-white px-4 py-2 rounded-md">Login</button>
              <p>Belum daftar? <Link to="/signup" className="text-blue-500 underline" onClick={() => document.getElementById("my_modal_3").close()}>Signup</Link></p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
export default Login;