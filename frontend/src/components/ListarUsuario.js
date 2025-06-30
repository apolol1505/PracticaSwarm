"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import API_BASE_URL from "../config.js"

export default function ListarUsuario() {
    const [lista, setLista] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getUsuarios()
    }, [])

    const getUsuarios = async () => {
        try {
            setLoading(true)
            setError("")
            const res = await axios.get(`${API_BASE_URL}/usuarios`)
            setLista(res.data)
        } catch (err) {
            setError("Error al cargar usuarios: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteUsuario = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/usuarios/${id}`)
            setLista(lista.filter((usuario) => usuario._id !== id))
        } catch (err) {
            setError("Error al eliminar usuario: " + err.message)
        }
    }

    if (loading) {
        return <div className="text-center">Cargando usuarios...</div>
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
                <button 
                    className="btn btn-outline-danger ms-3" 
                    onClick={getUsuarios}
                >
                    Reintentar
                </button>
            </div>
        )
    }

    return (
        <div>
            {lista.length === 0 ? (
                <div className="text-center">
                    <h4>No hay usuarios registrados</h4>
                    <Link className="btn btn-primary" to="/create">
                        Crear primer usuario
                    </Link>
                </div>
            ) : (
                <div className="row">
                    {lista.map((usuario) => (
                        <div className="col-md-4 p-2" key={usuario._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{usuario.nombre}</h5>
                                    <Link className="btn btn-secondary" to={`/edit/${usuario._id}`}>
                                        Editar
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>Email: {usuario.email}</p>
                                    <p>Edad: {usuario.edad}</p>
                                </div>
                                <div className="card-footer">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => deleteUsuario(usuario._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
