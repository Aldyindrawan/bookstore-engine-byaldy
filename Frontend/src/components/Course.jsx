import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Error Itu Bumbu, Ngoding Itu{" "}
            <span className="text-pink-500"> Seni! 🎨</span>
          </h1>
          <p className="mt-12">
            Selamat datang di ruang belajar pribadi kamu, tempat di mana bug dan error bukan lagi musuh, melainkan kawan yang bikin kamu makin jago. Menjadi seorang Fullstack Developer memang nggak mudah, butuh ribuan kali CTRL + S dan jutaan baris kode yang mungkin sering bikin kepala mau pecah. Tapi tenang, semua pusing itu bakal terbayar lunas pas aplikasi yang kamu bikin akhirnya jalan dengan sempurna dan bermanfaat buat orang banyak. Jangan cuma jadi penonton di era digital ini, jadilah pemain utama yang membangun masa depan lewat jemari kamu sendiri. Ambil bukunya, pahami logic-nya, dan mari kita rakit sesuatu yang luar biasa!
          </p>
          
          {/* Ini Tambahannya Dy! */}
          <p className="text-sm italic text-gray-500 mt-3">
            From Aldy Indrawan
          </p>

          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Rehat Dulu, Nanti Lanjut Lagi
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;