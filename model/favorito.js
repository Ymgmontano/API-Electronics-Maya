const mongoose = require('mongoose');

const favoritosSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true,
  },
});

module.exports = mongoose.model('Favoritos', favoritosSchema);