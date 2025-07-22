import React, { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan pada server");
    }
  };

  // REGISTER HANDLER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerData.role) {
      alert("Pilih role terlebih dahulu.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registrasi berhasil");
        setTab("login");
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan pada server");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 flex items-center justify-center">
      {/* Blob dan dekorasi lainnya tetap sama */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-300 rounded-full blur-2xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-10 left-10 w-10 h-10 bg-white rounded-full opacity-20"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-white rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl opacity-20">✈</div>

      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden">
        {/* Tab buttons */}
        <div className="flex">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-3 font-semibold ${tab === "login" ? "bg-purple-700 text-white" : "bg-white text-purple-700"}`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-3 font-semibold ${tab === "register" ? "bg-purple-700 text-white" : "bg-white text-purple-700"}`}
          >
            SIGN UP
          </button>
        </div>

        {/* Form Content */}
        {tab === "login" ? (
          <div className="px-8 py-10">
            <h2 className="text-2xl font-bold text-purple-700 text-center mb-2">WELCOME</h2>
            <p className="text-sm text-gray-500 text-center mb-6">to the Laundry App</p>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
                className="w-full border border-purple-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                className="w-full border border-purple-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded mb-2"
              >
                SIGN IN
              </button>
            </form>
          </div>
        ) : (
          <div className="px-8 py-10">
            <h2 className="text-2xl font-bold text-purple-700 text-center mb-2">CREATE ACCOUNT</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Join our community</p>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                required
                className="w-full border border-purple-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
                className="w-full border border-purple-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
                className="w-full border border-purple-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={registerData.role}
                onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                required
                className="w-full border border-purple-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="kasir">Kasir</option>
                <option value="owner">Owner</option>
              </select>
              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded"
              >
                SIGN UP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
