import Cart from "../model/cart.model.js";

// 1. Fungsi Tambah ke Keranjang
export const addToCart = async (req, res) => {
    try {
        const { name, title, price, image, category, email } = req.body;
        const cartItem = new Cart({
            name,
            title,
            price,
            image,
            category,
            email,
        });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: "Gagal masuk keranjang" });
    }
};

// 2. Fungsi Ambil Data Keranjang (Berdasarkan Email)
export const getCart = async (req, res) => {
    try {
        const email = req.query.email;
        const items = await Cart.find({ email: email });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json(error);
    }
};

// 3. Fungsi Hapus SATU Item dari Keranjang (Berdasarkan ID)
export const deleteCart = async (req, res) => {
    try {
        const id = req.params.id; 
        const deletedItem = await Cart.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ message: "Item tidak ditemukan" });
        }
        
        res.status(200).json({ message: "Buku berhasil dihapus dari keranjang!" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus item", error });
    }
};

// 4. Fungsi Kosongkan SEMUA Item (Berdasarkan Email)
// Digunakan setelah konfirmasi pembayaran BNI
export const emptyCart = async (req, res) => {
    try {
        const email = req.params.email;
        const result = await Cart.deleteMany({ email: email });
        res.status(200).json({ 
            message: "Keranjang berhasil dikosongkan!", 
            deletedCount: result.deletedCount 
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengosongkan keranjang", error });
    }
};