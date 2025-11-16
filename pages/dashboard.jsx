import { useEffect, useState } from "react";
import api from "../lib/api";
import Link from "next/link";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    promedio: 0,
    recientes: []
  });

  useEffect(() => {
    // Leer rol desde cookie (middleware ya lo usa)
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (role === "admin") setIsAdmin(true);

    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/estadisticas/stats");
      setStats(res.data);
    } catch (e) {
      console.log("Error cargando estadísticas");
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* ==============================
          TITULO
      ============================== */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Panel Principal</h1>
        <p className="text-gray-600">Bienvenido al sistema colaborativo de reputación de inquilinos.</p>
      </div>

      {/* ==============================
          TARJETAS DE ESTADÍSTICAS
      ============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="card text-center">
          <div className="text-4xl font-bold text-blue-700">{stats.totalInquilinos}</div>
          <div className="text-gray-700 mt-1">Inquilinos registrados</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl font-bold text-yellow-500">{stats.promedioGeneral?.toFixed(1)}</div>
          <div className="text-gray-700 mt-1">Reputación promedio</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl font-bold text-green-600">{stats.recientes.length}</div>
          <div className="text-gray-700 mt-1">Evaluaciones recientes</div>
        </div>

      </div>

      {/* ==============================
          ACCIONES RÁPIDAS
      ============================== */}
      <div>
        <h2 className="text-xl font-semibold text-primary mb-3">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link href="/inquilinos" className="card text-center hover:bg-blue-50">
            🏠 Ver/gestionar inquilinos
          </Link>

          <Link href="/buscar" className="card text-center hover:bg-blue-50">
            🔍 Buscar por DNI / CUIT
          </Link>

          <Link href="/inquilinos" className="card text-center hover:bg-blue-50">
            ➕ Cargar nuevo inquilino
          </Link>

        </div>
      </div>

      {/* ==============================
          SECCIÓN SOLO ADMIN
      ============================== */}
      {isAdmin && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-3">Administración</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Link href="/admin/inmobiliarias" className="card hover:bg-blue-50">
              🏢 Administrar inmobiliarias
            </Link>

            <Link href="/register" className="card hover:bg-blue-50">
              👤 Crear cuenta para una inmobiliaria
            </Link>

          </div>
        </div>
      )}

      {/* ==============================
          ÚLTIMAS EVALUACIONES
      ============================== */}
      <div>
        <h2 className="text-xl font-semibold text-primary mb-3">Últimas evaluaciones</h2>

        {stats.recientes.length === 0 && (
          <p className="text-gray-500">Todavía no hay evaluaciones registradas.</p>
        )}

        <div className="space-y-3">
          {stats.recientes.map((e) => (
            <div key={e.id} className="card flex items-center justify-between">
              <div>
                <div className="font-bold text-primary">{e.nombre_inquilino}</div>
                <div className="text-sm text-gray-600">{e.dni}</div>
                <div className="text-sm text-gray-600">{e.fecha}</div>
              </div>
              <div className="text-xl">⭐ {e.puntaje}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
