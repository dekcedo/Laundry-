import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrasiPelanggan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    telepon: "",
    gender: "",
    zipCode: "",
    alamat: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("pelanggan")) || [];
    data.push(form);
    localStorage.setItem("pelanggan", JSON.stringify(data));
    setForm({
      firstName: "",
      lastName: "",
      telepon: "",
      gender: "",
      zipCode: "",
      alamat: "",
    });
    alert("Pelanggan berhasil didaftarkan.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-purple-700 mb-6 text-center">Registrasi Pelanggan</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="First Name"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            />
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Last Name"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.telepon}
              onChange={(e) => setForm({ ...form, telepon: e.target.value })}
              placeholder="Nomor Telepon"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            />

            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
            >
              <option value="">Pilih Gender</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <input
            value={form.zipCode}
            onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
            placeholder="ZIP Code"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
          />

          <textarea
            value={form.alamat}
            onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            placeholder="Alamat Lengkap"
            required
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 resize-none"
          ></textarea>

          {/* Tombol Kembali */}
          <button
            type="button"
            onClick={() => navigate(-1)} // bisa juga ganti ke navigate("/dashboard") atau rute lain
            className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Kembali
          </button>

          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
