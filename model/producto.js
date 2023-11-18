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

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
