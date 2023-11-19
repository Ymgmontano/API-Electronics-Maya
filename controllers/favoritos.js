const Favoritos = require('../models/favoritos');

// Agregar producto a favoritos
async function agregarAFavoritos(usuarioId, productoId) {
  try {
    const favoritoExistente = await Favoritos.findOne({ usuario: usuarioId, producto: productoId });

    if (favoritoExistente) {
      throw new Error('El producto ya está en la lista de favoritos');
    }

    const nuevoFavorito = new Favoritos({ usuario: usuarioId, producto: productoId });
    await nuevoFavorito.save();
    return { mensaje: 'Producto agregado a favoritos' };
  } catch (error) {
    console.error('Error al agregar a favoritos:', error);
    throw error;
  }
}

// Eliminar producto de favoritos
async function eliminarDeFavoritos(usuarioId, productoId) {
  try {
    await Favoritos.findOneAndDelete({ usuario: usuarioId, producto: productoId });
    return { mensaje: 'Producto eliminado de favoritos' };
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
    throw error;
  }
}

module.exports = {
  agregarAFavoritos,
  eliminarDeFavoritos,
};