import React from "react"; // Tambahkan ini
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import RegistrasiPelanggan from "./pages/RegistrasiPelanggan";
import CrudOutlet from "./pages/CrudOutlet";
import CrudProduk from "./pages/CrudProduk";
import CrudPengguna from "./pages/CrudPengguna";
import EntriTransaksi from "./pages/EntriTransaksi";
import Laporan from "./pages/Laporan";

export default function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/RegistrasiPelanggan" element={<RegistrasiPelanggan />} />
      <Route path="/CrudOutlet" element={<CrudOutlet />} />
      <Route path="/CrudProduk" element={<CrudProduk />} />
      <Route path="/CrudPengguna" element={<CrudPengguna />} />
      <Route path="/EntriTransaksi" element={<EntriTransaksi />} />
      <Route path="/laporan" element={<Laporan />} />
    </Routes>
  );
}
