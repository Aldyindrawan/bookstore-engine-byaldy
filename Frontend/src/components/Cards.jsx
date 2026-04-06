import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Cards({ item }) {
  const [authUser] = useAuth();

  const handleAddToCart = async () => {
    // Gunakan email dari authUser jika ada, kalau tidak pakai guest/hardcode sementara
    const userEmail = authUser ? authUser.email : "aldy@test.com";

    const cartItem = {
      name: item.name,
      title: item.title,
      price: item.price,
      image: item.image,
      category: item.category,
      email: userEmail,
    };

    try {
      const res = await axios.post("http://localhost:4001/cart", cartItem);
      if (res.data) {
        toast.success("Berhasil masuk keranjang! 🛒");
        
        // SINYAL: Beritahu Navbar bahwa ada perubahan data
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (err) {
      console.log("Error Keranjang:", err);
      toast.error("Gagal nambahin ke keranjang, Dy!");
    }
  };

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border flex flex-col h-[480px]">
        <figure className="h-56 w-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
          <img 
            src={item.image} 
            alt="Books" 
            className="h-full object-contain p-4" 
          />
        </figure>

        <div className="card-body flex flex-col flex-grow p-4">
          <h2 className="card-title text-md h-14 overflow-hidden line-clamp-2 items-start">
            {item.name}
            <div className="badge badge-secondary ml-1 shrink-0">{item.category}</div>
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 h-12 overflow-hidden line-clamp-2">
            {item.title}
          </p>

          <div className="card-actions justify-between mt-auto pt-2">
            <div className="badge badge-outline font-bold text-pink-500 border-pink-500">
              Rp {item.price}
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="cursor-pointer px-3 py-1 rounded-full border-[2px] text-sm hover:bg-pink-500 hover:text-white duration-200 font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;