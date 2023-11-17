const mongoose = require("mongoose");
// Definicion del esquema a utilizar para la coleccion de menu
const VentasSchema = new mongoose.Schema({
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
// se manda a llamar la coleccion de menu
module.exports = mongoose.model("ventas", VentasSchema);