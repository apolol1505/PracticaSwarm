const app = require('./src/app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📊 Servidor: ${require('os').hostname()}`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
}); 