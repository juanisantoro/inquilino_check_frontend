import { useState } from "react";
import Swal from "sweetalert2";
import { api } from "../lib/api";

export default function Buscar() {
  const [dni, setDni] = useState("");
  const [result, setResult] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    try {
      const res = await api().get("/inquilinos/dni/" + dni);
      setResult(res.data);
      if (res.data.length === 0) {
        Swal.fire("Sin resultados", "No encontramos al inquilino. ¿Deseas darlo de alta?", "info");
      }
    } catch {
      Swal.fire("Error", "No se pudo buscar", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Buscar por DNI/CUIT</h1>
      <form onSubmit={search} className="card mb-4">
        <div className="flex gap-2">
          <input className="input flex-1" placeholder="DNI o CUIT" value={dni} onChange={e=>setDni(e.target.value)} />
          <button className="btn">Buscar</button>
        </div>
      </form>

      <div className="grid gap-3">
        {result.map((i) => (
          <div key={i.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold">{i.nombre} — {i.dni}</div>
                <div className="text-sm">Reputación promedio: <b>{i.reputacion}</b></div>
              </div>
              <a className="btn" href={"/historial/" + i.id}>Ver historial</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
