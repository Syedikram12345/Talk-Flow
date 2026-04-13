import express from "express";
import cors from "cors";
import db from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.post("/api/add-chat", async (req, res) => {
  const token = req.cookies?.token;
  const secret = process.env.JWT_SECRET;
  const { name, uniqueId } = req.body;

  if (!name || !uniqueId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const decoded = jwt.verify(token, secret);

  try {
    const isUser = await db.query("SELECT * FROM users WHERE unique_id = $1", [
      uniqueId,
    ]);

    if (isUser.rows.length > 0) {
      const result = await db.query(
        "INSERT INTO contacts(user_unique_id, friend_unique_id,name) values($1 ,$2,$3) RETURNING * ",
        [decoded.uuid, uniqueId, name],
      );

      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Enter a valid id" });
    }
  } catch (err) {
    console.log("Full error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/chats", async (req, res) => {
  const token = req.cookies?.token;
  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);

  try {
    const result = await db.query(
      "SELECT * FROM contacts WHERE user_unique_id = $1  order by id DESC",
      [decoded.uuid],
    );

    if (result.rows.length === 0) {
      const result = await db.query(
        "SELECT * FROM contacts WHERE friend_unique_id = $1 order by id DESC",
        [decoded.uuid],
      );

      res.json({ showFriendsName: true, result: result.rows });
    }

    res.json({ result: result.rows });
  } catch (err) {
    console.log("DB ERROR IN GET:", err);
    res.status(500).json({ error: "database error" });
  }
});

app.delete("/api/delete-chat/:uniqueId", async (req, res) => {
  try {
    const token = req.cookies?.token;
    const secret = process.env.JWT_SECRET;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, secret);
    const uniqueId = req.params.uniqueId;
    await db.query(
      `DELETE FROM contacts 
       WHERE (user_unique_id = $1 AND friend_unique_id = $2)
       OR (user_unique_id = $2 AND friend_unique_id = $1)`,
      [decoded.uuid, uniqueId],
    );

    await db.query(
      `DELETE FROM requests 
       WHERE (user_id = $1 AND friends_id = $2)
       OR (user_id = $2 AND friends_id = $1)`,
      [decoded.uuid, uniqueId],
    );

    res.json({ message: "Chat and friendship removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
});

// requests end point

app.post("/api/requests", async (req, res) => {
  try {
    const token = req.cookies?.token;
    const { name, friends_id } = req.body;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    const userCheck = await db.query(
      "SELECT * FROM users WHERE unique_id = $1",
      [friends_id],
    );

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const existing = await db.query(
      `SELECT * FROM requests 
       WHERE user_id = $1 AND friends_id = $2 AND status = $3`,
      [decoded.uuid, friends_id, "pending"],
    );

    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Request already sent, wait for response" });
    }

    const acceptedCheck = await db.query(
      `SELECT * FROM requests 
       WHERE user_id = $1 AND friends_id = $2 AND status = 'accepted'`,
      [decoded.uuid, friends_id],
    );

    if (acceptedCheck.rows.length > 0) {
      return res.status(400).json({ error: "Already friends" });
    }

    const response = await db.query(
      "INSERT INTO requests (user_id,friends_id,status,friends_name) VALUES($1,$2,$3,$4) RETURNING *",
      [decoded.uuid, friends_id, "pending", name],
    );

    return res.json(response.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/api/getNotifications", async (req, res) => {
  try {
    const token = req.cookies?.token;
    const secret = process.env.JWT_SECRET;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, secret);

    const response = await db.query(
      `
      SELECT 
        r.id,
        r.user_id,
        r.friends_id,
        r.status,
        u.name AS sender_name
      FROM requests r
      JOIN users u ON r.user_id = u.unique_id
      WHERE r.friends_id = $1 AND r.status = $2
      ORDER BY r.id DESC
    `,
      [decoded.uuid, "pending"],
    );

    res.json(response.rows);
  } catch (err) {
    console.log(err);
  }
});

app.patch("/api/requests/:id/accept", async (req, res) => {
  try {
    const token = req.cookies?.token;
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const id = req.params.id;

    const request = await db.query("SELECT * FROM requests WHERE id = $1", [
      id,
    ]);

    if (request.rows.length === 0)
      return res.status(404).json({ error: "Request not found" });

    const { user_id, friends_id, friends_name } = request.rows[0];

    const sender = await db.query(
      "SELECT name FROM users WHERE unique_id = $1",
      [user_id],
    );

    const senderRealName = sender.rows[0].name;

    await db.query("UPDATE requests SET status = 'accepted' WHERE id = $1", [
      id,
    ]);

    await db.query(
      "INSERT INTO contacts(user_unique_id, friend_unique_id, user_name, friend_name) VALUES($1,$2,$3,$4)",
      [decoded.uuid, user_id, friends_name, senderRealName],
    );

    res.json({ message: "Request accepted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/requests/:id/reject", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM requests WHERE id = $1", [id]);

    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("listening");
});
