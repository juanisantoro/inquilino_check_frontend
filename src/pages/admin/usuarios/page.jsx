"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api"; // ⬅ IMPORTANTE

export default function AdminUsuarios() {
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

    const cargarUsuarios = async () => {
        const res = await api.get("/usuarios"); // ⬅ CON TOKEN
        setUsuarios(res.data);
    };

    const cargarInmobiliarias = async () => {
        const res = await api.get("/admin/inmobiliarias"); // ⬅ CON TOKEN
        setInmobiliarias(res.data);
    };

    const crearUsuario = async () => {
        await api.post("/usuarios", nuevoUsuario); // ⬅ CON TOKEN
        await cargarUsuarios();
        alert("Usuario creado correctamente");
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
