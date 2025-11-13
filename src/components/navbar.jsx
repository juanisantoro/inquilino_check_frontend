import { useEffect, useState } from "react";
import Link from "next/link";



export default function Navbar() {
    const [role, setRole] = useState(null);
    const [hasSession, setHasSession] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Solo se ejecuta en el cliente
    useEffect(() => {
        const token = localStorage.getItem("token");
        const r = localStorage.getItem("role");

        setHasSession(!!token);
        setRole(r);
    }, []);
    return (
        <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
            <Link href="/" className="text-xl font-bold text-blue-600">
                InquilinoCheck
            </Link>

            {/* Mobile toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-2xl text-blue-600"
            >
                ☰
            </button>

            <div className={`md:flex gap-6 ${isOpen ? "block" : "hidden"}`}>
                <Link href="/dashboard" className="nav-link">
                    Panel principal
                </Link>

                <Link href="/buscar" className="nav-link">
                    Buscar Inquilino
                </Link>

                <Link href="/inquilinos" className="nav-link">
                    Mis Inquilinos
                </Link>

                {/* Solo admin */}
                {role === "admin" && (
                    <Link href="/admin/inmobiliarias" className="nav-link text-blue-700 font-semibold">
                        Administrar inmobiliarias
                    </Link>
                )}

                {/* Botón dinámico */}
                {hasSession ? (
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                    >
                        Cerrar sesión
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                    >
                        Iniciar sesión
                    </Link>
                )}
            </div>

            <style jsx>{`
        .nav-link {
          display: block;
          padding: 8px 0;
          color: #1e3a8a;
        }
        .nav-link:hover {
          text-decoration: underline;
        }
      `}</style>
        </nav>
    );
}
