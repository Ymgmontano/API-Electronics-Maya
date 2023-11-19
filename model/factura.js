const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  carrito: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrito',
    required: true,
  }],
  pago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pago',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Factura = mongoose.model('Factura', facturaSchema);

module.exports = Factura;