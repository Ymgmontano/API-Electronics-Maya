const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      cantidad: Number,
      precio: Number,
      subtotal: Number,
    },
  ],
  total: Number,
});

module.exports = mongoose.model('Carrito', carritoSchema);