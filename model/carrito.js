const mongoose = require('mongoose');
const carritoSchema = new mongoose.Schema(
   {
      usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
      productos: [
         {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            cantidad: Number,
            subtotal: Number,
         },
      ],
  total: Number,
});

const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = Carrito;
