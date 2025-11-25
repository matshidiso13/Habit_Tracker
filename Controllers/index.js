import express from "express";
import { pool } from "./db.js";

const router = express.Router();

router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT id, full_name, email, bio, avatar_url FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while viewing profile" });
  }
});

router.put("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, bio, avatar_url } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET full_name = $1,
           bio = $2,
           avatar_url = $3
       WHERE id = $4
       RETURNING id, full_name, email, bio, avatar_url`,
      [full_name, bio, avatar_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while updating profile" });
  }
});
