import express from "express";
import cors from "cors";
import db from "./db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.post("/api/add-chat", async (req, res) => {
  // console.log("POST /api/add-chat CALLED", req.body);
  const { name, uniqueId } = req.body;

  if (!name || !uniqueId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const isUser = await db.query("SELECT * FROM users WHERE unique_id = $1", [
      uniqueId,
    ]);

    if (isUser.rows.length > 0) {
      const result = await db.query(
        "INSERT INTO chats(name, unique_id) values($1 ,$2) RETURNING * ",
        [name, uniqueId],
      );

      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Enter a valid id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
});

app.get("/api/chats", async (req, res) => {
  // console.log("GET /api/chats CALLED");
  try {
    const result = await db.query("SELECT * FROM chats order by id DESC");
    res.json(result.rows);
  } catch (err) {
    console.log("DB ERROR IN GET:", err);
    res.status(500).json({ error: "database error" });
  }
});

// app.get("/api/check-id", async (req, res) => {
//   const uniqueId = req.body;
//   try {
//     const result = await db.query("SELECT * FROM chats WHERE unique_id = $1", [
//       uniqueId,
//     ]);
//     res.json(result.rows);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.delete("/api/delete-chat/:uniqueId", async (req, res) => {
  const uniqueId = req.params.uniqueId;

  try {
    await db.query("DELETE FROM chats WHERE unique_id = $1", [uniqueId]);
    res.json({ message: "Chat deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "database error" });
  }
});

app.listen(3000, () => {
  console.log("listening");
});
