import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EntriTransaksi() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    tanggal: "",
    berat: "",
    total: "",
    deskripsi: "",
    metode: "cash",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.berat <= 0 || form.total <= 0) {
      alert("Berat dan total harus lebih dari 0.");
      return;
    }

    const data = JSON.parse(localStorage.getItem("transaksi")) || [];
    data.push(form);
    localStorage.setItem("transaksi", JSON.stringify(data));
    setForm({
      nama: "",
      tanggal: "",
      berat: "",
      total: "",
      deskripsi: "",
      metode: "cash",
    });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Entri Transaksi
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Nama Pelanggan
            </label>
            <input
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Masukkan nama"
              required
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Tanggal Transaksi
            </label>
            <input
              type="date"
              value={form.tanggal}
              onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
              required
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Berat Cucian (kg)
            </label>
            <input
              type="number"
              value={form.berat}
              onChange={(e) => setForm({ ...form, berat: e.target.value })}
              placeholder="Contoh: 2"
              required
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Total Bayar (Rp)
            </label>
            <input
              type="number"
              value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })}
              placeholder="Contoh: 15000"
              required
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Deskripsi
            </label>
            <textarea
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              placeholder="Contoh: Bed cover"
              rows="3"
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Metode Pembayaran
            </label>
            <select
              value={form.metode}
              onChange={(e) => setForm({ ...form, metode: e.target.value })}
              className="w-full border border-purple-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="cash">Cash</option>
              <option value="qris">QRIS</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded transition"
            >
              Simpan Transaksi
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded transition"
            >
               Kembali
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded flex items-center gap-2 text-sm">
            <CheckCircle className="w-5 h-5" /> Transaksi berhasil disimpan!
          </div>
        )}
      </div>
    </div>
  );
}
