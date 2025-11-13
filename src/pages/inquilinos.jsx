import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import  api  from "../lib/api";

export default function Inquilinos() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ nombre: "", dni: "", telefono: "", email: "", direccion_actual: "" });

  const load = async () => {
    try {
      const res = await api.get("/inquilinos");
      setList(res.data);
    } catch {
      Swal.fire("Error", "No se pudo cargar", "error");
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/inquilinos", form);
      setForm({ nombre: "", dni: "", telefono: "", email: "", direccion_actual: "" });
      await load();
      Swal.fire("OK", "Inquilino creado", "success");
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.error || "No se pudo crear", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Inquilinos</h1>

      <form onSubmit={create} className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries({
            nombre: "Nombre",
            dni: "DNI/CUIT",
            telefono: "Teléfono",
            email: "Email",
            direccion_actual: "Dirección actual"
          }).map(([k, label]) => (
            <input key={k} className="input" placeholder={label} value={form[k] || ""} onChange={e=>setForm({ ...form, [k]: e.target.value })} />
          ))}
        </div>
        <button className="btn mt-2">Guardar</button>
      </form>

      <div className="grid gap-3">
        {list.map((i) => (
          <div key={i.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-primary">{i.nombre} — {i.dni}</div>
                <div className="text-sm text-gray-600">{i.email} · {i.telefono}</div>
              </div>
              <a href={"/historial/" + i.id} className="btn">Ver historial</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
