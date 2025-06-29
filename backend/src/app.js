const express = require("express")
const cors = require("cors")
const os = require("os")
const clickRoutes = require('./routes/click')

// Importar la conexión a la base de datos
require('./database')

const app = express()

// settings
app.set("port", process.env.PORT || 4000)

// middlewares
app.use(cors())
app.use(express.json())

// Rutas de clicks
app.use('/api/clicks', clickRoutes)

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        message: "🚀 Backend funcionando en Docker Swarm!",
        timestamp: new Date().toISOString(),
        server: os.hostname(),
        node: process.env.NODE_ENV || "development",
        endpoints: {
            clicks: "/api/clicks",
            total: "/api/clicks/total",
            increment: "/api/clicks/increment",
            reset: "/api/clicks/reset",
            stats: "/api/clicks/stats"
        }
    })
})

// Ruta para obtener información del servidor
app.get("/api/info", (req, res) => {
    res.json({
        server: os.hostname(),
        node: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: os.platform(),
        arch: os.arch()
    })
})

// Ruta de salud
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        server: os.hostname()
    })
})

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: "Algo salió mal!",
        message: err.message
    })
})

// Ruta 404
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl
    })
})

// rutas de usuarios (CRUD)
app.use("/api/usuarios", require("./routes/usuario"))

module.exports = app
