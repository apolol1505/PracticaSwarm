const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
    },
    email: {
        type: String,
    },
    edad: {
        type: Number,
    },
}, {
    timestamps: true
});

module.exports = model('usuario', usuarioSchema);