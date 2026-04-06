import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";

function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const queryFromNavbar = new URLSearchParams(location.search).get("search") || "";
  const [localSearch, setLocalSearch] = useState("");

  const [newBook, setNewBook] = useState({
    name: "",
    title: "",
    price: "",
    image: "",
    category: "Pro"
  });

  const getBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4001/book");
      setBook(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (error) {
      console.log("Error narik data:", error);
      setBook([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleSimpanBuku = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4001/book", newBook);
      toast.success("Buku Berhasil Ditambah! 🚀");
      setNewBook({ name: "", title: "", price: "", image: "", category: "Pro" });
      document.getElementById('modal_tambah_buku').close();
      getBook();
    } catch (error) {
      console.error("Gagal simpan:", error);
      toast.error("Gagal simpan. Cek koneksi backend kamu!");
    }
  };

  const filteredBooks = book.filter((item) => {
    const activeSearch = (queryFromNavbar || localSearch).toLowerCase();
    const bookName = item.name ? item.name.toLowerCase() : "";
    return bookName.includes(activeSearch);
  });

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden bg-slate-900 min-h-screen">
        
        {/* Ornamen Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]"></div>
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, 
              backgroundSize: '70px 70px' 
            }}
          ></div>
        </div>

        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 relative z-10 text-center">
          <div className="pt-32">
            
            {/* --- HERO SECTION: GAYA LUCU & TECH --- */}
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
              Kopi Habis, Kode Jalan, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
                Terminal Aman. ☕
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
                Selamat datang di <span className="text-pink-500 font-bold italic">gudang amunisi</span> **bookStore Engine**. Tempat di mana bug-bug nakalmu dicarikan obatnya.
              </p>
              <p className="text-base md:text-lg text-slate-400 italic">
                Pilih bukunya, baca pelan-pelan, dan mari kita buat laptopmu berhenti berisik karena kipas yang kepanasan.
              </p>
            </div>

            {/* WATERMARK NAMA ALDY */}
            <div className="mt-10 mb-12">
              <div className="inline-block px-6 py-1.5 border-y border-slate-700/50">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500 font-mono italic">
                  — Debugged with Love by <span className="text-pink-500 font-bold">Aldy Indrawan</span> —
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/">
                <button className="bg-slate-800 text-white px-8 py-3 rounded-full border border-slate-700 hover:bg-slate-700 transition duration-300">
                  Kembali ke Beranda
                </button>
              </Link>
              <button 
                className="bg-pink-500 text-white px-10 py-3 rounded-full hover:bg-pink-700 transition duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)] font-bold transform hover:scale-105"
                onClick={() => document.getElementById('modal_tambah_buku').showModal()}
              >
                + Tambah Koleksi Baru
              </button>
            </div>

            {/* SEARCH BAR */}
            <div className="mt-12 max-w-lg mx-auto">
              <input 
                type="text" 
                placeholder="Cari buku sakti kamu di sini..." 
                className="w-full px-6 py-3 rounded-full bg-slate-800/30 backdrop-blur-md border border-slate-700 focus:outline-none focus:border-pink-500 text-white shadow-inner transition-all text-center placeholder:text-slate-500"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Grid Buku */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 pb-24">
            {loading ? (
              <div className="col-span-4 text-center py-20">
                <span className="loading loading-spinner loading-lg text-pink-500"></span>
                <p className="mt-2 text-slate-400">Menyinkronkan database...</p>
              </div>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((item) => (
                <div key={item._id} className="hover:scale-105 transition-transform duration-300">
                  <Cards item={item} />
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-24 text-slate-500 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
                <p className="text-xl">Ops! Belum ada buku yang cocok... 😅</p>
                <p className="text-sm mt-2">Mungkin bukunya lagi di-compile. Coba cari yang lain!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* MODAL TAMBAH BUKU */}
      <dialog id="modal_tambah_buku" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-slate-900 border border-slate-700 text-white shadow-2xl">
          <h3 className="font-bold text-xl mb-6 text-pink-500">Kirim Amunisi Baru 📚</h3>
          <form onSubmit={handleSimpanBuku} className="space-y-4 text-left">
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Nama Buku</span></label>
              <input type="text" className="input input-bordered bg-slate-800 border-slate-600 focus:border-pink-500" required value={newBook.name} onChange={(e) => setNewBook({...newBook, name: e.target.value})} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">Deskripsi Singkat</span></label>
              <input type="text" className="input input-bordered bg-slate-800 border-slate-600 focus:border-pink-500" required value={newBook.title} onChange={(e) => setNewBook({...newBook, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text text-slate-300">Harga</span></label>
                <input type="number" className="input input-bordered bg-slate-800 border-slate-600 focus:border-pink-500" required value={newBook.price} onChange={(e) => setNewBook({...newBook, price: Number(e.target.value)})} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-slate-300">Kategori</span></label>
                <select className="select select-bordered bg-slate-800 border-slate-600" value={newBook.category} onChange={(e) => setNewBook({...newBook, category: e.target.value})}>
                  <option value="Pro">Pro</option>
                  <option value="Free">Free</option>
                  <option value="Beginner">Beginner</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-slate-300">URL Gambar (Link Gambar)</span></label>
              <input type="text" className="input input-bordered bg-slate-800 border-slate-600 focus:border-pink-500" required value={newBook.image} onChange={(e) => setNewBook({...newBook, image: e.target.value})} />
            </div>
            <div className="modal-action">
              <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('modal_tambah_buku').close()}>Batal</button>
              <button type="submit" className="btn bg-pink-500 hover:bg-pink-700 text-white border-none px-8 shadow-lg shadow-pink-500/30">Simpan Amunisi</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Course;