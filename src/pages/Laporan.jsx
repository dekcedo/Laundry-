import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Laporan() {
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTransaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
    setTransaksi(storedTransaksi);
  }, []);

  const total = transaksi.reduce((sum, t) => sum + Number(t.total || 0), 0);

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus transaksi ini?")) {
      const newTransaksi = [...transaksi];
      newTransaksi.splice(index, 1);
      localStorage.setItem("transaksi", JSON.stringify(newTransaksi));
      setTransaksi(newTransaksi);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 print:bg-white print:p-0">
      {/* Styling khusus saat print */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md print:shadow-none print:rounded-none">
        {/* Header dan tombol */}
        <div className="flex justify-between items-center mb-6 no-print">
          <h1 className="text-2xl font-bold text-purple-700">Laporan Transaksi</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Kembali
            </button>
            <button
              onClick={() => window.print()}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
            >
              Cetak
            </button>
          </div>
        </div>

        {/* Ringkasan total */}
        <div className="bg-purple-50 border border-purple-200 text-purple-800 p-4 rounded mb-6 print:border-none print:bg-white">
          <p className="text-sm">Total Pemasukan:</p>
          <h2 className="text-xl font-semibold">Rp {total.toLocaleString()}</h2>
        </div>

        {/* Tabel transaksi */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center border border-gray-300 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-purple-200 text-purple-900">
                <th className="p-3 font-medium">Nama</th>
                <th className="p-3 font-medium">Tanggal</th>
                <th className="p-3 font-medium">Berat</th>
                <th className="p-3 font-medium">Pembayaran</th>
                <th className="p-3 font-medium">Deskripsi</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium no-print">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transaksi.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-4 text-gray-500 text-center">
                    Belum ada transaksi.
                  </td>
                </tr>
              ) : (
                transaksi.map((t, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} align-middle`}
                  >
                    <td className="p-3">{t.nama}</td>
                    <td className="p-3">{t.tanggal}</td>
                    <td className="p-3">{t.berat} kg</td>
                    <td className="p-3 capitalize">{t.metode}</td>
                    <td className="p-3">{t.deskripsi || "-"}</td>
                    <td className="p-3">Rp {Number(t.total).toLocaleString()}</td>
                    <td className="p-3 no-print">
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
