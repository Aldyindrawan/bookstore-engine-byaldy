import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); 

  // --- LOGIKA AMBIL DATA KERANJANG ---
  const getCartData = async () => {
    // Gunakan email dari authUser, jika belum login pakai email dummy agar tidak error
    const userEmail = authUser ? authUser.email : "aldy@test.com";
    
    try {
      const res = await axios.get(`http://localhost:4001/cart?email=${userEmail}`);
      setCart(res.data);
    } catch (error) {
      console.log("Error ambil data keranjang:", error);
    }
  };

  useEffect(() => {
    getCartData(); // Ambil data saat pertama kali load

    // --- KUNCI SUPAYA REALTIME ---
    // Mendengarkan sinyal 'cartUpdate' dari Cards.jsx
    window.addEventListener("cartUpdate", getCartData);

    // Hapus listener saat komponen tidak digunakan (cleanup)
    return () => {
      window.removeEventListener("cartUpdate", getCartData);
    };
  }, [authUser]); // Re-run kalau user login/logout

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (query.trim()) {
        navigate(`/course?search=${query}`);
      }
    }
  };

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setSticky(true);
      else setSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li><Link to="/" className="hover:text-pink-500 transition-all font-semibold">Home</Link></li>
      <li><Link to="/course" className="hover:text-pink-500 transition-all font-semibold">Course</Link></li>
      <li><Link to="/contact" className="hover:text-pink-500 transition-all font-semibold">Contact</Link></li>
      <li><Link to="/about" className="hover:text-pink-500 transition-all font-semibold">About</Link></li>
    </>
  );

  return (
    <>
      <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${
          sticky ? "shadow-md bg-base-200 dark:bg-slate-700 dark:text-white duration-300 transition-all ease-in-out" : "dark:bg-slate-800 dark:text-white"
        }`}>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-slate-800">
                {navItems}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-bold cursor-pointer tracking-tighter italic">book<span className="text-pink-500 font-extrabold">Store</span></Link>
          </div>

          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            
            <div className="hidden md:block">
              <label className="px-3 py-2 border rounded-md flex items-center gap-2 border-slate-300 dark:border-slate-600">
                <input type="text" className="grow outline-none bg-transparent" placeholder="Search" onKeyDown={handleSearch} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              </label>
            </div>

            {/* --- DROPDOWN KERANJANG REALTIME --- */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-pink-500/10 transition-all">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="badge badge-sm indicator-item bg-pink-500 border-none text-white font-bold animate-bounce">
                    {cart.length}
                  </span>
                </div>
              </div>
              <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-64 bg-slate-100 dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700">
                <div className="card-body p-4 text-black dark:text-white">
                  <span className="font-bold text-lg text-pink-500">{cart.length} Buku</span>
                  
                  <div className="max-h-48 overflow-y-auto space-y-2 my-2 scrollbar-hide">
                    {cart.length > 0 ? (
                      // Menampilkan 3 item terakhir yang dimasukkan
                      cart.slice(-3).reverse().map((item, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                          <img src={item.image} alt="" className="w-10 h-10 object-contain rounded-md" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold truncate">{item.name}</p>
                            <p className="text-[10px] text-green-500 font-semibold">Rp{item.price}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 text-center py-4 italic">Belum ada buku nih..</p>
                    )}
                  </div>

                  <div className="card-actions pt-2 border-t border-slate-200 dark:border-slate-700">
                    <Link to="/cart" className="btn bg-pink-500 btn-block btn-sm text-white border-none hover:bg-pink-600 shadow-md">
                      Lihat Semua
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* THEME & AUTH */}
            <label className="swap swap-rotate mr-2">
              <input type="checkbox" onChange={() => setTheme(theme === "light" ? "dark" : "light")} checked={theme === "dark"} />
              <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>

            {authUser ? <Logout /> : (
              <div>
                <a className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer shadow-lg" onClick={() => document.getElementById("my_modal_3").showModal()}>Login</a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;