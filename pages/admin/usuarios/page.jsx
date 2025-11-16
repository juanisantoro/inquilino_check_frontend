"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api"; // ⬅ IMPORTANTE

export default function AdminUsuarios() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editUsuario, setEditUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [inmobiliarias, setInmobiliarias] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "user",
        id_inmobiliaria: ""
    });

    useEffect(() => {
        cargarUsuarios();
        cargarInmobiliarias();
    }, []);


    const abrirModalEdicion = (u) => {
        setEditUsuario({ ...u });
        setModalAbierto(true);
    };
    
    const cargarUsuarios = async () => {
        const res = await api.get("/usuarios"); // ⬅ CON TOKEN

        setUsuarios(res.data);
    };

    const toggleUsuario = async (id) => {
        try {
            await api.patch(`/usuarios/${id}/toggle`);
            await cargarUsuarios();
        } catch (err) {
            console.error(err);
            alert("Error al cambiar estado");
        }
    };

    const cargarInmobiliarias = async () => {
        const res = await api.get("/admin/inmobiliarias"); // ⬅ CON TOKEN
       debugger;
        setInmobiliarias(res.data);
    };

    const crearUsuario = async () => {
        await api.post("/usuarios", nuevoUsuario); // ⬅ CON TOKEN
        await cargarUsuarios();
        alert("Usuario creado correctamente");
    };

    const guardarCambios = async () => {
        try {
            await api.put(`/usuarios/${editUsuario.id}`, editUsuario);
            await cargarUsuarios();
            setModalAbierto(false);
        } catch (err) {
            console.error(err);
            alert("Error guardando cambios");
        }
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Administrar Usuarios</h1>

            <div className="bg-white shadow p-4 rounded mb-6">
                <h2 className="text-xl font-semibold mb-3">Crear Usuario</h2>

                <input className="input" placeholder="Nombre"
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />

                <input className="input" placeholder="Email"
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />

                <input className="input" placeholder="Contraseña" type="password"
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />

                <select className="input"
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                <select className="input"
                    onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, id_inmobiliaria: e.target.value })}>
                    <option value="">Seleccionar inmobiliaria</option>
                    {inmobiliarias.map(i => (
                        <option key={i.id} value={i.id}>{i.nombre}</option>
                    ))}
                </select>

                <button
                    className="bg-blue-600 text-white px-4 py-2 mt-3 rounded-md"
                    onClick={crearUsuario}
                >
                    Crear Usuario
                </button>
            </div>

            <div className="bg-white shadow p-4 rounded">
                <h2 className="text-xl font-semibold mb-3">Lista de Usuarios</h2>

                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Inmobiliaria</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map(u => (
                            <tr key={u.id} className="border-b">
                                <td>{u.nombre}</td>
                                <td>{u.email}</td>
                                <td>{u.rol}</td>
                                <td>{u.inmobiliaria_nombre ?? "-"}</td>
                                <td>{u.activo ? "Sí" : "No"}</td>

                                <td className="flex gap-2">

                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        onClick={() => abrirModalEdicion(u)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className={
                                            u.activo
                                                ? "bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                                : "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                        }
                                        onClick={() => toggleUsuario(u.id)}
                                    >
                                        {u.activo ? "Suspender" : "Activar"}
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {modalAbierto && editUsuario && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 shadow-lg rounded w-96">

                            <h2 className="text-xl font-bold mb-4">Editar usuario</h2>

                            <input
                                className="input mb-3"
                                value={editUsuario.nombre}
                                placeholder="Nombre"
                                onChange={e => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
                            />

                            <input
                                className="input mb-3"
                                value={editUsuario.email}
                                placeholder="Email"
                                onChange={e => setEditUsuario({ ...editUsuario, email: e.target.value })}
                            />

                            <select
                                className="input mb-3"
                                value={editUsuario.rol}
                                onChange={e => setEditUsuario({ ...editUsuario, rol: e.target.value })}
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>

                            <select
                                className="input mb-3"
                                value={editUsuario.id_inmobiliaria}
                                onChange={e => setEditUsuario({ ...editUsuario, id_inmobiliaria: e.target.value })}
                            >
                                <option value="">Seleccionar inmobiliaria</option>
                                {inmobiliarias.map(i => (
                                    <option key={i.id} value={i.id}>{i.nombre}</option>
                                ))}
                            </select>

                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                                onClick={guardarCambios}
                            >
                                Guardar cambios
                            </button>

                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded w-full mt-2"
                                onClick={() => setModalAbierto(false)}
                            >
                                Cancelar
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
