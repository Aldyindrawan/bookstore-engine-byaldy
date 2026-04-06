import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  // orderId dibuat opsional agar tidak error saat simulasi pertama
  orderId: { 
    type: String, 
    default: () => "ORD-" + Math.floor(Math.random() * 1000000) 
  }, 
  userName: String,
  userEmail: String, 
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      name: String, // Sesuaikan dengan 'name' yang dikirim dari Cart.jsx
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: Number,
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Settlement', 'Failure', 'Expired', 'Success'] // Tambah Success untuk simulasi
  },
  createdAt: { type: Date, default: Date.now }
});

// GUNAKAN DEFAULT EXPORT
const Order = mongoose.model('Order', orderSchema);
export default Order;