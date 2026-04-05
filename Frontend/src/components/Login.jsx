import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          // Durasi toast: 3 detik (3000ms)
          toast.success("Satu Langkah Lebih Dekat Jadi Arsitek Sistem Handal! ✅", {
            duration: 3000, 
          });
          
          document.getElementById("my_modal_3").close();
          localStorage.setItem("Users", JSON.stringify(res.data.user));

          // Jeda reload: 3.5 detik biar toast-nya puas tampil dulu
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        }
      })
      .catch((err) => {
        if (err.response) {
          // Error dikasih 4 detik biar user bisa baca pesannya pelan-pelan
          toast.error("Gagal Masuk. Tenang, Developer Hebat Juga Pernah Salah Ketik. 💻", {
            duration: 4000,
          });
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        {/* ... sisa code return sama seperti sebelumnya ... */}
        <div className="modal-box dark:bg-slate-900 dark:text-white border-[1px] dark:border-slate-700">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg text-pink-500">Masuk ke bookStore</h3>
            
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Masukkan email kamu"
                className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-800 dark:border-slate-600"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className="text-sm text-red-500">Email-nya jangan kosong ya, Dy!</span>}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Masukkan password"
                className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-800 dark:border-slate-600"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className="text-sm text-red-500">Password juga wajib diisi nih.</span>}
            </div>

            <div className="flex justify-around mt-6">
              <button className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200 font-medium">
                Login
              </button>
              <p>Belum daftar? <Link to="/signup" className="underline text-blue-500">Signup</Link></p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;