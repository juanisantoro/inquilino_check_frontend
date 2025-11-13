import { useState } from "react";
import Swal from "sweetalert2";
import { api } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api().post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      Swal.fire("Error", "Credenciales inválidas", "error");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-secondary">
      <form onSubmit={handleLogin} className="card w-96">
        <h1 className="text-2xl font-bold mb-6 text-primary text-center">Inquilino Check</h1>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn w-full">Ingresar</button>
        <p className="text-center mt-3">
          ¿Sin cuenta? <a className="text-blue-700 underline" href="/register">Crear cuenta</a>
        </p>
      </form>
    </div>
  );
}
