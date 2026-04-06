import express from "express";
import { addToCart, getCart, deleteCart, emptyCart } from "../controller/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", deleteCart); 
router.delete("/all/:email", emptyCart); // <--- Jalur buat bersihin keranjang

export default router;