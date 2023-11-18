const Product = require('../models/product');

//creacion de producto
async function crearProducto(dataProducto) {
  try {
    const nuevoProducto = new Product(dataProducto);
    const productoGuardado = await nuevoProducto.save();
    return productoGuardado;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
}

//obtencion de producto
async function obtenerProductos() {
  try {
    const productos = await Product.find();
    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

//Obtencion de producto mediante ID
async function obtenerProductoPorId(id) {
  try {
    const producto = await Product.findById(id);
    return producto;
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    throw error;
  }
}

//Actualizacion de producto
async function actualizarProducto(id, newDataProducto) {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(id, newDataProducto, { new: true });
    return productoActualizado;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
}

//Eliminacion de producto
async function eliminarProducto(id) {
  try {
    await Product.findByIdAndDelete(id);
    return { message: 'Producto eliminado exitosamente' };
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};
