import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");

      // --- KALIMAT MOTIVASI LOGOUT DENGAN DURASI ---
      toast.success("Progress Disimpan. Ambil Jeda Sebentar, Kamu Sudah Hebat! ✨", {
        duration: 3000, // Tampil selama 3 detik
      });

      // Reload dijeda 3.5 detik biar toast-nya gak kepotong
      setTimeout(() => {
        window.location.reload();
      }, 3500); 
    } catch (error) {
      toast.error("Waduh, ada kendala pas mau istirahat: " + error.message, {
        duration: 4000, // Kalau error kasih waktu baca lebih lama
      });
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-700 duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;