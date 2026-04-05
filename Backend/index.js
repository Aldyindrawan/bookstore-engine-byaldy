import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;
// Ambil URI dari .env
const URI = process.env.MongoDBURI;

console.log("-----------------------------------------");
console.log("🔍 ANALISA KONEKSI ALDY...");
console.log("🔗 LINK TERBACA: ", URI ? URI.substring(0, 30) + "..." : "KOSONG!");
console.log("⏳ Sedang melakukan 'Handshake' ke MongoDB Cloud...");

// KONFIGURASI KONEKSI PALING SAKTI
const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 30000, // Tunggu 30 detik sebelum nyerah
            autoIndex: true,
            family: 4, // PAKSA pakai IPv4 (Menghindari error DNS di Hotspot/WiFi)
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        
        console.log("-----------------------------------------");
        console.log("✅ MANTAP ALDY! JALUR TERBUKA!");
        console.log("🚀 Database MongoDB Atlas Berhasil Terhubung.");
        console.log("-----------------------------------------");
    } catch (error) {
        console.log("-----------------------------------------");
        console.log("❌ MASIH GAGAL, DY! INI ANALISANYA:");
        console.log("Pesan Error:", error.message);
        console.log("\n💡 TIPS TERAKHIR:");
        console.log("1. Pastikan di Atlas sudah 'Allow Access from Anywhere' (0.0.0.0/0)");
        console.log("2. Cek apakah Password di .env ada karakter aneh (seperti @ atau #)");
        console.log("-----------------------------------------");
        process.exit(1); // Berhenti jika gagal konek
    }
};

// Jalankan Koneksi
connectDB();

app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`📡 Server berjalan di port: ${PORT}`);
});