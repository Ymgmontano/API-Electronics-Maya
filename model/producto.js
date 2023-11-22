const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
   {
      nombre: String,
      categoria: String,
      precio: Number,
      capacidad: String,
      marca: String, 
   }   
);

module.exports = mongoose.model('Producto', productoSchema);

