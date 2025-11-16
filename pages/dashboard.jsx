import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {

  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    debugger;
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Panel Principal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/inquilinos" className="card text-center hover:bg-blue-50">🏠 Inquilinos</a>
        <a href="/buscar" className="card text-center hover:bg-blue-50">🔍 Buscar Inquilino</a>
        {isAdmin && (
          <a href="/admin/inmobiliarias" className="card text-center hover:bg-blue-50">  Administrar inmobiliarias</a>
        )}
      </div>
    </div>
  );
}
