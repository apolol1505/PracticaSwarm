# Usar Node.js como imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el código fuente
COPY . .

# Exponer el puerto
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
