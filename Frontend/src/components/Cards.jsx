import React from "react";

function Cards({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border flex flex-col h-[450px]">
          {/* Area Gambar dengan Background Abu-abu Halus */}
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
            
            <p className="text-sm text-gray-600 dark:text-gray-400 h-10 overflow-hidden line-clamp-2">
              {item.title}
            </p>

            <div className="card-actions justify-between mt-auto pt-2">
              <div className="badge badge-outline font-bold">${item.price}</div>
              <div className="cursor-pointer px-3 py-1 rounded-full border-[2px] text-sm hover:bg-pink-500 hover:text-white duration-200">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;