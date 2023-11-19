const Carrito = require('../models/carritoCompras');
const Producto = require('../models/producto');

// Agregar producto al carrito
async function agregarAlCarrito(productoId, cantidad) {
  try {
    const producto = await Producto.findById(productoId);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    let carrito = await Carrito.findOne({ producto: productoId });

    if (carrito) {
      carrito.cantidad += parseInt(cantidad);
    } else {
      carrito = new Carrito({
        producto: productoId,
        cantidad: parseInt(cantidad),
      });
    }

    await carrito.save();
    return { mensaje: 'Producto agregado al carrito' };
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
}

// Eliminar producto del carrito
async function eliminarDelCarrito(productoId) {
  try {
    const carrito = await Carrito.findOneAndDelete({ producto: productoId });

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    return { mensaje: 'Producto eliminado del carrito' };
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    throw error;
  }
}

// Actualizar cantidad de producto en el carrito
async function actualizarCantidad(productoId, nuevaCantidad) {
  try {
    const carrito = await Carrito.findOne({ producto: productoId });

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    carrito.cantidad = parseInt(nuevaCantidad);
    await carrito.save();

    return { mensaje: 'Cantidad actualizada en el carrito' };
  } catch (error) {
    console.error('Error al actualizar la cantidad:', error);
    throw error;
  }
}

// Obtener todos los productos en el carrito
async function obtenerProductosEnCarrito() {
  try {
    const productosEnCarrito = await Carrito.find().populate('producto', 'nombre precio');
    return { productosEnCarrito };
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
}

module.exports = {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  obtenerProductosEnCarrito,
};