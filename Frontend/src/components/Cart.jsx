import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [authUser] = useAuth();

  const handleCheckout = async () => {
    if (!authUser) return toast.error("Silakan login terlebih dahulu!");
    if (cartItems.length === 0) return toast.error("Keranjang kamu masih kosong!");

    const totalAmount = cartItems.reduce((acc, curr) => acc + curr.price, 0);

    try {
      // POST ke /order/checkout
      const response = await axios.post("http://127.0.0.1:4001/order/checkout", {
        userName: authUser.fullname,
        userEmail: authUser.email,
        items: cartItems.map(item => ({
            bookId: item._id,
            name: item.name, 
            price: item.price,
            quantity: 1
        })),
        totalPrice: totalAmount,
      });

      if (response.data.success) {
        toast.success("Pesanan dicatat! Alihkan ke pembayaran...");
        // Simpan total untuk ditampilkan di halaman Payment
        localStorage.setItem("lastOrderTotal", totalAmount);
        setTimeout(() => { 
            window.location.href = "/payment"; 
        }, 1500);
      }
    } catch (error) {
      console.error("DEBUG:", error.response?.data || error.message);
      toast.error("Gagal checkout. Cek koneksi backend!");
    }
  };

  const getCartData = async () => {
    if (!authUser?.email) return;
    try {
      const res = await axios.get(`http://127.0.0.1:4001/cart?email=${authUser.email}`);
      setCartItems(res.data);
    } catch (error) { console.log(error); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4001/cart/${id}`);
      toast.success("Buku dihapus!");
      getCartData(); 
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (error) { toast.error("Gagal hapus"); }
  };

  useEffect(() => { getCartData(); }, [authUser]);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28 pb-10 min-h-screen dark:bg-slate-900 dark:text-white">
        <h1 className="text-2xl font-semibold mb-6">Daftar Belanja Anda 🛒</h1>
        {cartItems.length > 0 ? (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table w-full bg-white dark:bg-slate-800">
              <thead className="bg-pink-500 text-white">
                <tr><th>Buku</th><th>Nama</th><th>Harga</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b dark:border-slate-700">
                    <td><img src={item.image} alt="" className="w-12 h-16 object-contain" /></td>
                    <td><div className="font-bold">{item.name}</div></td>
                    <td className="font-bold text-pink-500">Rp {item.price}</td>
                    <td><button onClick={() => handleDelete(item._id)} className="btn btn-xs btn-error text-white">Hapus</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 bg-gray-50 dark:bg-slate-800 flex justify-end items-center gap-6">
                <div className="text-xl font-bold">Total: <span className="text-pink-500">Rp {cartItems.reduce((acc, curr) => acc + curr.price, 0)}</span></div>
                <button onClick={handleCheckout} className="btn bg-pink-500 text-white border-none px-8 shadow-lg">Checkout Sekarang</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">Keranjang kosong.</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;