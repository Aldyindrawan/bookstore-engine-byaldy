import express from "express";
import { getBook, createBook } from "../controller/book.controller.js";

const router = express.Router();

// Route untuk mengambil data (GET)
router.get("/", getBook);

// Route untuk menambah data baru (POST)
router.post("/", createBook); 

// --- BARIS INI WAJIB ADA AGAR INDEX.JS TIDAK CRASH ---
export default router;