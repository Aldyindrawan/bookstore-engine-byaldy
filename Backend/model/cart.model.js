import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    name: String,
    title: String,
    price: Number,
    image: String,
    category: String,
    email: String, // Penting: Untuk membedakan keranjang antar user
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;