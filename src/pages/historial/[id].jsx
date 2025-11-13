import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { api } from "../lib/api";

export default function Historial() {
  const router = useRouter();
  const { id } = router.query;
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [form, setForm] = useState({ comentario: "", puntaje: 5 });

  const load = async () => {
    if (!id) return;
    try {
      const res = await api().get("/evaluaciones/" + id);
      setEvaluaciones(res.data);
    } catch {
      Swal.fire("Error", "No se pudo cargar", "error");
    }
  };

  useEffect(() => { load(); }, [id]);

  const add = async (e) => {
    e.preventDefault();
    try {
      await api().post("/evaluaciones", { id_inquilino: id, ...form });
      setForm({ comentario: "", puntaje: 5 });
      await load();
    } catch {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Historial</h1>

      <form onSubmit={add} className="card mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select className="input" value={form.puntaje} onChange={e=>setForm({ ...form, puntaje: Number(e.target.value) })}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <input className="input md:col-span-3" placeholder="Comentario" value={form.comentario} onChange={e=>setForm({ ...form, comentario: e.target.value })} />
        </div>
        <button className="btn mt-2">Agregar evaluación</button>
      </form>

      <div className="grid gap-3">
        {evaluaciones.map(e => (
          <div key={e.id} className="card">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{e.inmobiliaria}</div>
                <div className="text-sm text-gray-600">{new Date(e.fecha).toLocaleString()}</div>
              </div>
              <div className="text-xl">⭐ {e.puntaje}</div>
            </div>
            <p className="mt-2">{e.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
