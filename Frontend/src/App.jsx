import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./components/Course"; 
import Signup from "./components/Signup";
import Contact from "./components/Contact"; 
import Cart from "./components/Cart";     
import Payment from "./components/Payment"; 
import Delivery from "./components/Delivery"; // <--- TAMBAHAN: Import halaman pengiriman
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import About from "./components/About"; 

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white min-h-screen">
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<Home />} />
          
          {/* Halaman Course */}
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          
          {/* Halaman Keranjang */}
          <Route 
            path="/cart" 
            element={authUser ? <Cart /> : <Navigate to="/signup" />} 
          />

          {/* Halaman Pembayaran BNI */}
          <Route 
            path="/payment" 
            element={authUser ? <Payment /> : <Navigate to="/signup" />} 
          />

          {/* Halaman Status Pengiriman (BARU!) */}
          <Route 
            path="/delivery" 
            element={authUser ? <Delivery /> : <Navigate to="/signup" />} 
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;