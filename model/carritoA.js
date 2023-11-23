const mongoose = require('mongoose');

const carritoASchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
  productos: [
    {
      id:String,
      title: String,
      description: String,
      price: Number,
      image: String,
      subtotal: Number,
    },
  ],
  total: Number,
});

module.exports = mongoose.model('CarritoA', carritoASchema);
