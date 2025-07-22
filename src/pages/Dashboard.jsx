import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut, Store, Users, Package, FileText,
  UserPlus, LayoutGrid,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  const COLORS = ["#6366F1", "#22D3EE", "#F59E0B", "#EF4444"];
  const layanan = ["Cuci Kering", "Setrika", "Cuci Basah", "Express"];

  // Fungsi bantu: Nama bulan dari index
  const getMonthName = (index) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[index];
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const produk = JSON.parse(localStorage.getItem("produk")) || [];
    const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

    // Pie Data: jumlah produk per jenis layanan
    const pieChartData = layanan.map((jenis) => ({
      name: jenis,
      value: produk.filter((p) => p.jenis === jenis).length,
    }));
    setPieData(pieChartData);

    // Bar Data: total pemasukan per bulan
    const pemasukanBulanan = {};
    transaksi.forEach((t) => {
      const date = new Date(t.tanggal);
      const month = getMonthName(date.getMonth());
      pemasukanBulanan[month] = (pemasukanBulanan[month] || 0) + Number(t.total || 0);
    });

    const barChartData = Object.entries(pemasukanBulanan).map(([bulan, pemasukan]) => ({
      bulan,
      pemasukan,
    }));
    setBarData(barChartData);
  }, []);

  // Data ringkasan
  const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
  const totalPemasukan = transaksi.reduce((sum, t) => sum + Number(t.total || 0), 0);
  const totalOutlet = (JSON.parse(localStorage.getItem("outlet")) || []).length;
  const totalPaket = (JSON.parse(localStorage.getItem("produk")) || []).length;
  const totalPelanggan = (JSON.parse(localStorage.getItem("pelanggan")) || []).length;

  // Logout handler
  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // Menu berdasarkan peran
  const menus = {
    admin: [
      { title: "Registrasi Pelanggan", href: "/RegistrasiPelanggan", icon: <UserPlus size={20} /> },
      { title: "Kelola Outlet", href: "/CrudOutlet", icon: <Store size={20} /> },
      { title: "Kelola Pengguna", href: "/CrudPengguna", icon: <Users size={20} /> },
      { title: "Paket Cucian", href: "/CrudProduk", icon: <Package size={20} /> },
      { title: "Transaksi", href: "/EntriTransaksi", icon: <FileText size={20} /> },
      { title: "Laporan", href: "/laporan", icon: <LayoutGrid size={20} /> },
    ],
    kasir: [
      { title: "Registrasi Pelanggan", href: "/RegistrasiPelanggan", icon: <UserPlus size={20} /> },
      { title: "Transaksi", href: "/EntriTransaksi", icon: <FileText size={20} /> },
      { title: "Laporan", href: "/laporan", icon: <LayoutGrid size={20} /> },
    ],
    owner: [
      { title: "Laporan", href: "/laporan", icon: <LayoutGrid size={20} /> },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-purple-700 mb-8">Laundry App</h2>
          <nav className="space-y-4">
            {menus[user?.role]?.map((menu, index) => (
              <Link
                key={index}
                to={menu.href}
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-lg transition"
              >
                {menu.icon}
                <span>{menu.title}</span>
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Selamat datang, {user?.name} ({user?.role})
        </h1>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <SummaryCard title="Total Pemasukan" value={`Rp ${totalPemasukan.toLocaleString()}`} color="text-green-600" />
          <SummaryCard title="Jumlah Outlet" value={totalOutlet} color="text-purple-700" />
          <SummaryCard title="Paket Cucian" value={totalPaket} color="text-indigo-600" />
          <SummaryCard title="Pelanggan" value={totalPelanggan} color="text-indigo-600" />
        </div>

        {/* Grafik & Kalender */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold mb-3">Grafik Pemasukan Bulanan</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pemasukan" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold mb-3">Jenis Layanan Terpopuler</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Kalender */}
          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-semibold mb-4 text-center">Kalender</h3>
            <div className="flex justify-center">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="rounded border-none"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Komponen kartu ringkasan
function SummaryCard({ title, value, color }) {
  return (
    <div className="bg-white p-5 rounded shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}
