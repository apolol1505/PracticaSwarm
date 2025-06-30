# Práctica Docker Swarm - Aplicación MERN

Este proyecto es una aplicación web completa construida con la stack MERN (MongoDB, Express.js, React.js, Node.js) desplegada usando Docker Swarm.

## 🚀 Características

- **Backend**: API REST con Express.js y MongoDB
- **Frontend**: Interfaz de usuario con React.js
- **Base de datos**: MongoDB con persistencia de datos
- **Orquestación**: Docker Swarm para gestión de contenedores
- **Escalabilidad**: Múltiples réplicas de servicios

## 📋 Prerrequisitos

- Docker
- Docker Swarm inicializado
- Git

## 🛠️ Instalación y Despliegue

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd PracticaSwarm
```

### 2. Construir las imágenes Docker
```bash
# Construir imagen del backend
docker build -t practica-swarm-backend:latest ./backend

# Construir imagen del frontend
docker build -t practica-swarm-frontend:latest ./frontend
```

### 3. Desplegar con Docker Swarm
```bash
docker stack deploy -c docker-stack.yml practica-swarm
```

### 4. Verificar el despliegue
```bash
docker stack services practica-swarm
docker stack ps practica-swarm
```

## 🌐 Acceso a la aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **MongoDB**: localhost:27018

## 📁 Estructura del proyecto

```
PracticaSwarm/
├── backend/                 # API REST con Express.js
│   ├── src/
│   │   ├── controller/      # Controladores
│   │   ├── models/          # Modelos de MongoDB
│   │   └── routes/          # Rutas de la API
│   └── Dockerfile
├── frontend/                # Aplicación React
│   ├── src/
│   │   └── components/      # Componentes React
│   └── Dockerfile
├── docker-compose.yml       # Configuración para desarrollo
├── docker-stack.yml         # Configuración para Docker Swarm
└── setup-cluster.sh         # Script de configuración del cluster
```

## 🔧 Configuración

### Variables de entorno

El proyecto utiliza las siguientes variables de entorno:

- `MONGO_INITDB_ROOT_USERNAME`: Usuario administrador de MongoDB
- `MONGO_INITDB_ROOT_PASSWORD`: Contraseña de MongoDB
- `MONGO_INITDB_DATABASE`: Nombre de la base de datos
- `MONGODB_URI`: URI de conexión a MongoDB
- `NODE_ENV`: Entorno de ejecución
- `PORT`: Puerto del servidor backend

## 📊 Monitoreo

Para monitorear los servicios:

```bash
# Ver logs de un servicio específico
docker service logs practica-swarm_backend

# Ver estadísticas de los servicios
docker stack services practica-swarm
```

## 🧹 Limpieza

Para eliminar el stack:

```bash
docker stack rm practica-swarm
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 