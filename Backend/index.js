import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// 1. IMPORT SEMUA ROUTE
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cartRoute from "./route/cart.route.js";
import orderRoute from "./route/order.route.js"; 

const app = express();
dotenv.config();

// 2. MIDDLEWARE (Baju Besi Server - DIPERKUAT)
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Izinkan akses dari Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

// 3. KONEKSI DATABASE
console.log("-----------------------------------------");
console.log("🔍 ANALISA KONEKSI...");

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("✅ MANTAP! JALUR TERBUKA!");
        console.log("🚀 Database Berhasil Terhubung.");
    } catch (error) {
        console.log("❌ MASIH GAGAL! Pesan Error:", error.message);
    }
};

connectDB();

// 4. DAFTAR ROUTE
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute); 

// 5. JALANKAN SERVER
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`📡 Server berjalan di port: ${PORT}`);
    console.log(`🔗 Cek Checkout di: http://localhost:${PORT}/order/checkout`);
    console.log("-----------------------------------------");
});