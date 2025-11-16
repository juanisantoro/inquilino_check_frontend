import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import api from "../../lib/api";

export default function Historial() {
  const router = useRouter();
  const { id } = router.query;

  const [evaluaciones, setEvaluaciones] = useState([]);
  const [form, setForm] = useState({ comentario: "", puntaje: 5 });

  // Modal de información (se abre al principio)
  const [showInfo, setShowInfo] = useState(true);

  const load = async () => {
    if (!id) return;
    try {
      const res = await api.get("/evaluaciones/" + id);
      setEvaluaciones(res.data);
    } catch {
      Swal.fire("Error", "No se pudo cargar", "error");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.post("/evaluaciones", { id_inquilino: id, ...form });
      setForm({ comentario: "", puntaje: 5 });
      await load();
    } catch (err) {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div className="p-6">

      {/* ====== TÍTULO + BOTÓN INFO ====== */}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-primary">
          Historial del Inquilino
        </h1>

        {/* Botón de información */}
        <button
          onClick={() => setShowInfo(true)}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 flex items-center gap-1"
        >
          ℹ️ Info
        </button>
      </div>

      {/* ====== MODAL DE ESCALA ====== */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">

            <h2 className="text-xl font-bold text-primary mb-4 text-center">
              Escala de reputación del inquilino
            </h2>

            <ul className="text-gray-700 space-y-2">
              <li>⭐ <b>1 - Muy malo:</b> conflictos, deudas, incumplimientos graves.</li>
              <li>⭐⭐ <b>2 - Malo:</b> atrasos frecuentes, dificultades de comunicación.</li>
              <li>⭐⭐⭐ <b>3 - Aceptable:</b> comportamiento razonable con algunos detalles.</li>
              <li>⭐⭐⭐⭐ <b>4 - Bueno:</b> responsable, pagos al día, buena convivencia.</li>
              <li>⭐⭐⭐⭐⭐ <b>5 - Excelente:</b> inquilino ideal, prolijo y confiable.</li>
            </ul>

            <div className="text-center mt-6">
              <button
                onClick={() => setShowInfo(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====== FORMULARIO PARA AGREGAR EVALUACIÓN ====== */}
      <form onSubmit={add} className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            className="input"
            value={form.puntaje}
            onChange={(e) =>
              setForm({ ...form, puntaje: Number(e.target.value) })
            }
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <input
            className="input md:col-span-3"
            placeholder="Comentario"
            value={form.comentario}
            onChange={(e) =>
              setForm({ ...form, comentario: e.target.value })
            }
          />
        </div>

        <button className="btn mt-2">Agregar evaluación</button>
      </form>

      {/* ====== LISTA DE EVALUACIONES ====== */}
      <div className="grid gap-3">
        {evaluaciones.map((e) => (
          <div key={e.id} className="card">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">#{String(e.id).padStart(4, "0")}</div>
                <div className="text-sm text-gray-600">
                  {new Date(e.fecha).toLocaleString()}
                </div>
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
