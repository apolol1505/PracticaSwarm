#!/bin/bash

# Script para configurar un cluster con Docker Machine y Oracle VirtualBox
# Autor: Tu nombre
# Fecha: $(date)

set -e  # Salir si hay algún error

echo "🚀 Configurando cluster con Docker Machine y Oracle VirtualBox"
echo "================================================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que Docker Machine esté instalado
check_docker_machine() {
    if ! command -v docker-machine &> /dev/null; then
        print_error "Docker Machine no está instalado. Por favor instálalo primero."
        exit 1
    fi
    print_success "Docker Machine está instalado"
}

# Verificar que VirtualBox esté instalado
check_virtualbox() {
    if ! command -v VBoxManage &> /dev/null; then
        print_error "Oracle VirtualBox no está instalado. Por favor instálalo primero."
        exit 1
    fi
    print_success "Oracle VirtualBox está instalado"
}

# Crear nodo manager
create_manager() {
    print_status "Creando nodo manager..."
    
    docker-machine create \
        --driver virtualbox \
        --virtualbox-memory 2048 \
        --virtualbox-cpu-count 2 \
        --virtualbox-disk-size 10000 \
        manager
    
    print_success "Nodo manager creado exitosamente"
}

# Crear nodos worker
create_workers() {
    local num_workers=${1:-2}
    
    print_status "Creando $num_workers nodos worker..."
    
    for i in $(seq 1 $num_workers); do
        print_status "Creando worker-$i..."
        docker-machine create \
            --driver virtualbox \
            --virtualbox-memory 1024 \
            --virtualbox-cpu-count 1 \
            --virtualbox-disk-size 5000 \
            worker-$i
        print_success "Worker-$i creado exitosamente"
    done
}

# Configurar swarm en el manager
setup_swarm() {
    print_status "Configurando Docker Swarm en el manager..."
    
    # Conectar al manager
    eval $(docker-machine env manager)
    
    # Inicializar swarm
    docker swarm init --advertise-addr $(docker-machine ip manager)
    
    # Obtener token para workers
    WORKER_TOKEN=$(docker swarm join-token -q worker)
    MANAGER_IP=$(docker-machine ip manager)
    
    print_success "Swarm inicializado en manager"
    print_status "Token para workers: $WORKER_TOKEN"
    print_status "IP del manager: $MANAGER_IP"
}

# Unir workers al swarm
join_workers() {
    local num_workers=${1:-2}
    
    print_status "Uniendo workers al swarm..."
    
    # Obtener token e IP del manager
    eval $(docker-machine env manager)
    WORKER_TOKEN=$(docker swarm join-token -q worker)
    MANAGER_IP=$(docker-machine ip manager)
    
    for i in $(seq 1 $num_workers); do
        print_status "Uniendo worker-$i al swarm..."
        eval $(docker-machine env worker-$i)
        docker swarm join --token $WORKER_TOKEN $MANAGER_IP:2377
        print_success "Worker-$i unido al swarm"
    done
}

# Construir y subir imágenes
build_and_push_images() {
    print_status "Construyendo imágenes Docker..."
    
    # Conectar al manager
    eval $(docker-machine env manager)
    
    # Construir imagen del backend
    print_status "Construyendo imagen del backend..."
    docker build -t mernm-crud-backend:latest ./backend
    
    # Construir imagen del frontend
    print_status "Construyendo imagen del frontend..."
    docker build -t mernm-crud-frontend:latest ./frontend
    
    print_success "Imágenes construidas exitosamente"
}

# Desplegar stack
deploy_stack() {
    print_status "Desplegando stack en el swarm..."
    
    # Conectar al manager
    eval $(docker-machine env manager)
    
    # Desplegar stack
    docker stack deploy -c docker-stack.yml mernm-stack
    
    print_success "Stack desplegado exitosamente"
}

# Mostrar información del cluster
show_cluster_info() {
    print_status "Información del cluster:"
    echo "=================================="
    
    # Conectar al manager
    eval $(docker-machine env manager)
    
    echo "Nodos del swarm:"
    docker node ls
    
    echo ""
    echo "Servicios desplegados:"
    docker service ls
    
    echo ""
    echo "IPs de los nodos:"
    echo "Manager: $(docker-machine ip manager)"
    for i in $(seq 1 2); do
        echo "Worker-$i: $(docker-machine ip worker-$i)"
    done
    
    echo ""
    print_success "Tu aplicación estará disponible en:"
    echo "Frontend: http://$(docker-machine ip manager):3000"
    echo "Backend API: http://$(docker-machine ip manager):4000"
    echo "MongoDB: $(docker-machine ip manager):27018"
}

# Función principal
main() {
    local num_workers=${1:-2}
    
    print_status "Iniciando configuración del cluster..."
    
    # Verificaciones
    check_docker_machine
    check_virtualbox
    
    # Crear nodos
    create_manager
    create_workers $num_workers
    
    # Configurar swarm
    setup_swarm
    join_workers $num_workers
    
    # Construir y desplegar
    build_and_push_images
    deploy_stack
    
    # Mostrar información
    show_cluster_info
    
    print_success "¡Cluster configurado exitosamente! 🎉"
}

# Ejecutar función principal
main "$@" 