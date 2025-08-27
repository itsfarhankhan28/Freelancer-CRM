import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(user) {
  return jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    {
      subject: user._id.toString(),
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    const token = signToken(user);
    return res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({ message: "Invalid input", details: err.issues });
    }
    return res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    return res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({ message: "Invalid input", details: err.issues });
    }
    return res.status(500).json({ message: "Server error" });
  }
}