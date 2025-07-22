import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CrudProduk() {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({ nama: "", jumlah: "", jenis: "", berat: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("produk")) || [];
    setProduk(stored);
  }, []);

  const save = (newData) => {
    setProduk(newData);
    localStorage.setItem("produk", JSON.stringify(newData));
  };

  const resetForm = () => {
    setForm({ nama: "", jumlah: "", jenis: "", berat: "" });
    setEditIndex(null);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.jumlah || form.jumlah < 1 || !form.berat || form.berat <= 0 || !form.jenis) {
      alert("Nama, jumlah, Berat, dan jenis harus diisi");
      return;
    }

    const newData = [...produk];
    editIndex !== null ? (newData[editIndex] = form) : newData.push(form);
    save(newData);
    resetForm();
  };

  const edit = (i) => {
    setForm(produk[i]);
    setEditIndex(i);
  };

  const del = (i) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      const filtered = produk.filter((_, index) => index !== i);
      save(filtered);
      resetForm();
    }
  };

  const filteredProduk = produk.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          CRUD Produk Laundry
        </h1>

        {/* Form Input */}
        <form
          onSubmit={submit}
          className="bg-white p-6 rounded-xl shadow-md border border-purple-200 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Nama"
              required
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="number"
              min={1}
              value={form.jumlah}
              onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
              placeholder="Jumlah Pakaian"
              required
              className="w-48 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={form.jenis}
              onChange={(e) => setForm({ ...form, jenis: e.target.value })}
              required
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Pilih Jenis Layanan</option>
              <option value="Express">Express</option>
              <option value="Cuci Basah">Cuci Basah</option>
              <option value="Cuci Kering">Cuci Kering</option>
              <option value="Setrika">Setrika</option>
            </select>

            <input
              type="number"
              step="0.1"
              min={0.1}
              value={form.berat}
              onChange={(e) => setForm({ ...form, berat: e.target.value })}
              placeholder="Berat (kg)"
              required
              className="p-1.5 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              {editIndex !== null ? "Update" : "Tambah"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-lg"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg"
            >
              Kembali
            </button>
          </div>
        </form>

        {/* Search Filter */}
        <div className="mt-8 mb-4">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* List Produk */}
        {filteredProduk.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada produk ditemukan.</p>
        ) : (
          <ul className="space-y-4">
            {filteredProduk.map((item, index) => (
              <li
                key={index}
                className="bg-white flex justify-between items-center p-4 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition"
              >
                <div>
                  <h2 className="font-bold text-purple-800">{item.nama}</h2>
                  <p className="text-sm text-gray-700">
                    Jenis: <span className="font-medium">{item.jenis}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Jumlah: {parseInt(item.jumlah).toLocaleString()} Pcs
                  </p>
                  <p className="text-sm text-gray-600">
                    Berat: {parseFloat(item.berat).toLocaleString()} Kg
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => edit(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
