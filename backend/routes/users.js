const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// GET semua pengguna
router.get("/", async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, name, email, role FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data pengguna", error: err.message });
  }
});

// POST tambah pengguna
router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ message: "Pengguna berhasil ditambahkan", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan pengguna", error: err.message });
  }
});

// PUT update pengguna
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const fields = [];
    const values = [];

    if (name) { fields.push("name = ?"); values.push(name); }
    if (email) { fields.push("email = ?"); values.push(email); }
    if (role) { fields.push("role = ?"); values.push(role); }
    if (password) {
      const hashedPassword = password.startsWith("$2b$")
        ? password // sudah hash
        : await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "Tidak ada data untuk diperbarui." });
    }

    values.push(id);

    await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
    res.json({ message: "Pengguna berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengupdate pengguna", error: err.message });
  }
});

// DELETE hapus pengguna
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "Pengguna berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus pengguna", error: err.message });
  }
});

module.exports = router;
