import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import  api  from "../../lib/api";
import Link from "next/link";

export default function AdminInmobiliarias() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [lista, setLista] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            router.push("/dashboard");
        } else {
            setIsAdmin(true);
            cargarInmobiliarias();
        }
    }, []);

    const cargarInmobiliarias = async () => {
        try {
            debugger;
            const res = await api.get("/admin/inmobiliarias");
            setLista(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const toggleEstado = async (id) => {
        try {
            await api.patch(`/admin/inmobiliarias/${id}/toggle`);
            cargarInmobiliarias();
        } catch (err) {
            console.log(err);
        }
    };

    if (!isAdmin) return null;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Administración de Inmobiliarias</h1>

            <Link
                href="/register"
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded shadow mb-4 inline-block"
            >
                Crear nueva inmobiliaria
            </Link>

            <div className="mt-6">
                <table className="min-w-full bg-white shadow rounded">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lista.map(item => (
                            <tr key={item.id} className="border-t">
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">{item.nombre}</td>
                                <td className="px-4 py-2">{item.email}</td>
                                <td className="px-4 py-2">
                                    {item.activo ? "Activo" : "Suspendido"}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        className={
                                            item.activo
                                                ? "bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                                : "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                        }
                                        onClick={() => toggleEstado(item.id)}
                                    >
                                        {item.activo ? "Suspender" : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
