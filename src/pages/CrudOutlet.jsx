import React, { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CrudOutlet() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama: "", alamat: "", telepon: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [notif, setNotif] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("outlet")) || [];
    setData(stored);
  }, []);

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem("outlet", JSON.stringify(newData));
    setNotif("Data berhasil disimpan!");
    setTimeout(() => setNotif(""), 2000);
  };

  const resetForm = () => {
    setForm({ nama: "", alamat: "", telepon: "" });
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{10,15}$/.test(form.telepon)) {
      alert("Nomor telepon harus terdiri dari 10-15 digit angka.");
      return;
    }

    const updated = [...data];
    if (editIndex !== null) {
      updated[editIndex] = form;
    } else {
      updated.push(form);
    }
    saveData(updated);
    resetForm();
  };

  const handleEdit = (i) => {
    setForm(data[i]);
    setEditIndex(i);
  };

  const handleDelete = (i) => {
    if (confirm("Yakin ingin menghapus outlet ini?")) {
      const updated = data.filter((_, index) => index !== i);
      saveData(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-8">Manajemen Outlet Laundry</h1>

        {notif && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded mb-5 text-center transition-all duration-300">
            {notif}
          </div>
        )}

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 border border-purple-200"
        >
          <input
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Nama Outlet"
            required
            className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            placeholder="Alamat"
            required
            className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            value={form.telepon}
            onChange={(e) => setForm({ ...form, telepon: e.target.value })}
            placeholder="Nomor Telepon (10-15 digit)"
            required
            className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex flex-wrap gap-3 mt-1">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition"
            >
              <PlusCircle size={18} /> {editIndex !== null ? "Update" : "Tambah"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-black px-4 py-3 rounded-lg font-medium"
            >
              <RefreshCcw size={16} /> Reset
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium"
            >
              ← Kembali
            </button>
          </div>
        </form>

        {/* List Outlet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">Belum ada data outlet.</p>
          ) : (
            data.map((outlet, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow hover:shadow-lg p-5 flex flex-col justify-between border border-purple-100 transition-all"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-purple-800">{outlet.nama}</h3>
                  <p className="text-gray-700">{outlet.alamat}</p>
                  <p className="text-sm text-gray-500">Telp: {outlet.telepon}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(i)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
