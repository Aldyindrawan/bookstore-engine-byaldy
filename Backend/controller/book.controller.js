import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error Get Data: ", error);
        res.status(500).json(error);
    }
};

export const createBook = async (req, res) => {
    try {
        const { name, title, price, category, image } = req.body;
        const newBook = new Book({
            name,
            title,
            price,
            category,
            image,
        });
        await newBook.save();
        console.log("✅ Data Berhasil Masuk:", newBook);
        res.status(201).json({ message: "Buku berhasil ditambah!", data: newBook });
    } catch (error) {
        console.log("❌ Gagal Simpan Buku:", error.message);
        res.status(500).json({ message: "Gagal menyimpan ke database" });
    }
};