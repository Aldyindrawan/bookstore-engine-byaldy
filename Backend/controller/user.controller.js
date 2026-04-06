import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User sudah terdaftar" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({
      message: "User berhasil dibuat",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Cari user dulu
    const user = await User.findOne({ email });
    
    // 2. Cek keberadaan user SEBELUM membandingkan password
    if (!user) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // 3. Baru bandingkan password jika user ada
    const isMatch = await bcryptjs.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // 4. Jika semua ok
    res.status(200).json({
      message: "Login berhasil",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};