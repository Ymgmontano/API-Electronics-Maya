const mongoose = require("mongoose");

const PagoSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
    },
    Correo: {
        type: String,
        required: true,
    },
    Telefono: {
        type: String,
        required: true,
    },
    Pais: {
        type: String,
        required: true,
    },
    Municipio: {
        type: String,
        required: true,
    },
    CP: {
        type: String,
        required: true,
    },
    Direccion: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("pago", PagoSchema);