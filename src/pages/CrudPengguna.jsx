import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Komponen notifikasi
const Notification = ({ message, type }) => {
  if (!message) return null;
  const style = type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div className={`p-3 mt-4 text-white rounded-lg text-center ${style}`}>
      {message}
    </div>
  );
};

export default function CrudPengguna() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/api/users";

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "", password: "", role: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Notifikasi dengan timer
  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // Ambil data dari backend
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal mengambil data");
      setUsers(data);
    } catch (error) {
      showNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  // Ambil data saat komponen dimuat
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset form input
  const resetForm = () => {
    setForm({ id: null, name: "", email: "", password: "", role: "" });
  };

  // Simpan / update pengguna
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.role || (!form.id && !form.password)) {
      showNotification("Lengkapi semua field yang wajib diisi!");
      return;
    }

    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Operasi gagal");

      showNotification(
        form.id ? "Pengguna berhasil diupdate!" : "Pengguna berhasil ditambahkan!",
        "success"
      );
      resetForm();
      fetchUsers();
    } catch (error) {
      showNotification(error.message);
    }
  };

  // Isi form dengan data pengguna
  const handleEdit = (user) => {
    setForm({ ...user, password: "" });
  };

  // Hapus pengguna
  const handleDelete = async (userId) => {
    if (window.confirm("Yakin ingin menghapus pengguna ini?")) {
      try {
        const response = await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Gagal menghapus pengguna");

        showNotification("Pengguna berhasil dihapus.", "success");
        fetchUsers();
        resetForm();
      } catch (error) {
        showNotification(error.message);
      }
    }
  };

  // Badge warna berdasarkan role
  const roleBadge = (role) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold text-white";
    if (role === "admin") return `${base} bg-purple-600`;
    if (role === "kasir") return `${base} bg-blue-600`;
    if (role === "owner") return `${base} bg-green-600`;
    return base;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
      >
        ← Kembali
      </button>

      <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
        Manajemen Pengguna
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* FORM INPUT */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-200"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Contoh: Dinda Sari"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Contoh: dinda@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder={form.id ? "Kosongkan jika tidak ingin ganti" : "Minimal 6 karakter"}
              required={!form.id}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="kasir">Kasir</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              {form.id ? "Update" : "Simpan"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>

          <Notification message={notification.message} type={notification.type} />
        </form>

        {/* TABEL DATA */}
        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-200">
          {isLoading ? (
            <p className="text-center p-4">Memuat data...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-400 italic p-4 text-center">
              Belum ada data pengguna.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm border-collapse">
                <thead>
                  <tr className="bg-purple-500 text-white text-left">
                    <th className="p-3 font-semibold">No</th>
                    <th className="p-3 font-semibold">Nama</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Role</th>
                    <th className="p-3 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-gray-100 transition"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span className={roleBadge(user.role)}>{user.role}</span>
                      </td>
                      <td className="p-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
