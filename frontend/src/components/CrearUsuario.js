"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import API_BASE_URL from "../config.js"

export default function CrearUsuario() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [edad, setEdad] = useState(0)
    const [editing, setEditing] = useState(false)
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            setEditing(true)
            setId(params.id)
            getUsuario(params.id)
        }
    }, [params.id])

    const getUsuario = async (id) => {
        try {
            setLoading(true)
            const res = await axios.get(`${API_BASE_URL}/usuarios/${id}`)
            setNombre(res.data.nombre)
            setEmail(res.data.email)
            setEdad(res.data.edad)
        } catch (err) {
            setError("Error al cargar usuario: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const newUser = { nombre, email, edad }

            if (editing) {
                await axios.put(`${API_BASE_URL}/usuarios/${id}`, newUser)
            } else {
                await axios.post(`${API_BASE_URL}/usuarios`, newUser)
            }

            navigate("/")
        } catch (err) {
            setError("Error al guardar usuario: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-center">Cargando...</div>
    }

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>{editing ? "Editar Usuario" : "Crear Usuario"}</h4>
                
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Edad"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : (editing ? "Actualizar" : "Crear")}
                    </button>
                </form>
            </div>
        </div>
    )
}
