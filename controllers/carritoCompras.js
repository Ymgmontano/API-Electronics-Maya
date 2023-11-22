/*const Carrito = require('../models/carritoCompras');
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
};*/

const Carrito = require('../model/carritoCompras');
const Producto = require('../model/producto');

// Agregar producto al carrito
const agregarAlCarrito = async (req, res) => {
  try {
    const productoId = req.body.productoId;
    const cantidad = parseInt(req.body.cantidad);

    const producto = await Producto.findById(productoId);

    if (producto) {
      throw new Error('Producto no encontrado');
    }

    let carrito = await Carrito.findOne({ 'productos.producto': productoId });

    if (carrito) {
      const productoEnCarrito = carrito.productos.find(p => p.producto.toString() === productoId);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.subtotal = productoEnCarrito.cantidad * producto.precio;
      } else {
        carrito.productos.push({
          producto: productoId,
          cantidad: cantidad,
          subtotal: cantidad * producto.precio,
        });
      }
      carrito.total = carrito.productos.reduce((total, p) => total + p.subtotal, 0);
    } else {
      carrito = new Carrito({
        productos: [{
          producto: productoId,
          cantidad: cantidad,
          precio: precio,
          subtotal: precio,
        }],
        total: precio,
      });
    }

    await carrito.save();
    res.status(201).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar producto del carrito
const eliminarDelCarrito = async (req, res) => {
  try {
    const productoId = req.params.id;

    const carrito = await Carrito.findOne({ 'productos.producto': productoId });

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    carrito.productos = carrito.productos.filter(p => p.producto.toString() !== productoId);
    carrito.total = carrito.productos.reduce((total, p) => total + p.subtotal, 0);

    await carrito.save();
    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(400).json({ mensaje: error.message });
  }
};

// Actualizar cantidad de producto en el carrito
const actualizarCantidad = async (req, res) => {
  try {
    const productoId = req.params.id;
    const nuevaCantidad = parseInt(req.body.nuevaCantidad);

    const carrito = await Carrito.findOne({ 'productos.producto': productoId });

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    const productoEnCarrito = carrito.productos.find(p => p.producto.toString() === productoId);
    if (!productoEnCarrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    productoEnCarrito.cantidad = nuevaCantidad;
    productoEnCarrito.subtotal = productoEnCarrito.cantidad * productoEnCarrito.precio;
    carrito.total = carrito.productos.reduce((total, p) => total + p.subtotal, 0);

    await carrito.save();
    res.json({ mensaje: 'Cantidad actualizada en el carrito' });
  } catch (error) {
    console.error('Error al actualizar la cantidad:', error);
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todos los productos en el carrito
const obtenerProductosEnCarrito = async (req, res) => {
  try {
    const productosEnCarrito = await Carrito.find().populate('productos.producto', 'nombre precio');
    res.json({ productosEnCarrito });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  obtenerProductosEnCarrito,
};