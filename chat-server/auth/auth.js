import express from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";
import env from "dotenv";
import bcrypt from "bcryptjs";
const router = express.Router();

env.config();

const secret = process.env.JWT_SECRET;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 60 * 60 * 1000,
};

router.post("/signUp", async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");

    const { email, password, name } = req.body;

    const myUUID = crypto.randomUUID();

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!name) {
      return res
        .status(400)
        .json({ message: "First name and Last name is required" });
    }

    const existingUser = users.rows.find((u) => u.email === email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password, unique_id, name) VALUES ($1, $2, $3,$4)",
      [email, hashedPassword, myUUID, name],
    );

    const token = jwt.sign({ email: email, uuid: myUUID, name: name }, secret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, COOKIE_OPTIONS);

    return res
      .status(201)
      .json({ message: "Signup successful", email, myUUID });
  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const userQuery = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const user = userQuery.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: user.email, uuid: user.unique_id, name: user.name },
      secret,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "Signin successful",
      email: user.email,
      uuid: user.unique_id,
    });
  } catch (err) {
    console.log("SIGNIN ERROR:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
});

router.get("/me", (req, res) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, secret);

    return res
      .status(200)
      .json({ email: decoded.email, uuid: decoded.uuid, name: decoded.name });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  return res.status(200).json({ message: "Logged out" });
});

export default router;
