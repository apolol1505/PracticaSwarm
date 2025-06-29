require('dotenv').config();
// ejecuta el archivo database.js
const app = require('./app');
require('./database');
// ejecuta el servidor
async function main() {
    await app.listen(app.get('port'));
    console.log('Servidor ejecutandose en el puerto:', app.get('port'));
};

main();

