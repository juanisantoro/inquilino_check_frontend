import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../lib/api";

export default function Inquilinos() {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    email: "",
    direccion_actual: ""
  });

  const [searchDni, setSearchDni] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // ====== Cargar lista general ======
  const load = async () => {
    try {
      const res = await api.get("/inquilinos");
      setList(res.data);
    } catch {
      Swal.fire("Error", "No se pudo cargar la lista", "error");
    }
  };

  useEffect(() => { load(); }, []);

  // ====== Buscar por DNI/CUIT ======
  const search = async (e) => {
    e.preventDefault();
    if (!searchDni.trim()) return;

    try {
      const res = await api.get("/inquilinos/dni/" + searchDni);
      setSearchResults(res.data);

      if (res.data.length === 0) {
        Swal.fire(
          "Sin resultados",
          "No encontramos al inquilino. ¿Querés darlo de alta?",
          "info"
        );
      } else {
        Swal.fire(
          "¡Resultados encontrados!",
          `Se encontraron ${res.data.length} coincidencia(s).`,
          "success"
        );
      }

    } catch {
      Swal.fire("Error", "No se pudo buscar", "error");
    }
  };
  // ====== Crear inquilino ======
  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/inquilinos", form);
      setIsOpen(false);
      setForm({ nombre: "", dni: "", telefono: "", email: "", direccion_actual: "" });
      await load();
      Swal.fire("Éxito", "Inquilino creado correctamente", "success");
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.error || "No se pudo crear", "error");
    }
  };

  return (
    <div className="p-6">

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">Inquilinos</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          ➕ Agregar inquilino
        </button>
      </div>

      {/* ================= BUSCADOR ================= */}
      <form onSubmit={search} className="card mb-6">
        <h2 className="text-xl font-semibold mb-2 text-primary">Buscar por DNI / CUIT</h2>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="DNI o CUIT"
            value={searchDni}
            onChange={(e) => setSearchDni(e.target.value)}
          />
          <button className="btn">Buscar</button>
        </div>
      </form>

      {/* ====== Resultados de búsqueda ====== */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-primary">Resultados de búsqueda</h3>

          <div className="grid gap-3">
            {searchResults.map((i) => (
              <div key={i.id} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-primary">{i.nombre} — {i.dni}</div>
                    <div className="text-sm">Reputación: <b>{i.reputacion}</b></div>
                  </div>
                  <a href={"/historial/" + i.id} className="btn">
                    Ver historial
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= LISTA GENERAL ================= */}
      <h3 className="text-lg font-bold mt-6 mb-3 text-primary">Todos los inquilinos</h3>

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

      {/* ================= MODAL CREAR ================= */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">

            <h2 className="text-xl font-bold mb-4 text-primary">
              Nuevo inquilino
            </h2>

            <form onSubmit={create} className="space-y-3">

              {[
                ["nombre", "Nombre completo"],
                ["dni", "DNI / CUIT"],
                ["telefono", "Teléfono"],
                ["email", "Email"],
                ["direccion_actual", "Dirección actual"]
              ].map(([key, label]) => (
                <input
                  key={key}
                  required={key !== "telefono"}
                  className="input w-full"
                  placeholder={label}
                  value={form[key] || ""}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                />
              ))}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Guardar inquilino
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
