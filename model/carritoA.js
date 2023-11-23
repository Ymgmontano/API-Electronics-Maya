const mongoose = require('mongoose');

const carritoASchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
  productos: [
    {
      id: String,
      title: String,
      price: Number,
      image: String,
    },
  ],
});

module.exports = mongoose.model('CarritoA', carritoASchema);