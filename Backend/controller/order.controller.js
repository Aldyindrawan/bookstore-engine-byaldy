import Order from "../model/OrderModel.js";

export const createOrder = async (req, res) => {
    try {
        const { userName, userEmail, items, totalPrice } = req.body;

        // Validasi sederhana supaya tidak error saat simpan ke DB
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Keranjang kosong!" });
        }

        const newOrder = new Order({
            userName,
            userEmail,
            items,
            totalPrice,
            status: "Success", // Karena ini simulasi, langsung set sukses
            createdAt: new Date()
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Pesanan berhasil dibuat (Simulasi)",
            order: newOrder
        });

    } catch (error) {
        console.log("❌ ERROR SYSTEM:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Gagal menyimpan pesanan ke database",
            error: error.message 
        });
    }
};