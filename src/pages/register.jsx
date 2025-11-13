import { useState } from "react";
import Swal from "sweetalert2";
import { api } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({
    nombreInmobiliaria: "",
    cuit: "",
    direccion: "",
    telefono: "",
    email: "",
    nombreUsuario: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api().post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.error || "No se pudo registrar", "error");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-secondary">
      <form onSubmit={submit} className="card w-[28rem]">
        <h1 className="text-2xl font-bold mb-4 text-primary text-center">Crear cuenta</h1>
        {Object.entries({
          nombreInmobiliaria: "Nombre de la inmobiliaria",
          cuit: "CUIT",
          direccion: "Dirección",
          telefono: "Teléfono",
          email: "Email",
          nombreUsuario: "Tu nombre",
          password: "Contraseña"
        }).map(([k, label]) => (
          <div key={k}>
            <input
              className="input"
              type={k === "password" ? "password" : "text"}
              placeholder={label}
              value={form[k]}
              onChange={e => setForm({ ...form, [k]: e.target.value })}
            />
          </div>
        ))}
        <button className="btn w-full">Registrarme</button>
        <p className="text-center mt-3"><a className="text-blue-700 underline" href="/">Volver a iniciar sesión</a></p>
      </form>
    </div>
  );
}
