const mongoose = require('mongoose');

// cadena de conexion a la base de datos
const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://admin:password123@mongodb:27017/mernapp?authSource=admin'

mongoose.connect(URI)

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected ! : ', URI);
});

connection.on('error', (err) => {
    console.error('Error connecting to database:', err);
});