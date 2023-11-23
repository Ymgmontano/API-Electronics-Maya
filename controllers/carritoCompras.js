const Carrito = require('../model/carritoCompras');
const Producto = require('../model/producto');

// Agregar producto al carrito
const agregarAlCarrito = async (req, res) => {
  try {
    const productoId = req.body.productoId;
    const cantidad = parseInt(req.body.cantidad);

    const producto = await Producto.findById(productoId);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    let carrito = await Carrito.findOne({ usuario: req.usuarioId });

    if (carrito) {
      const productoEnCarrito = carrito.productos.find(prod => prod.producto.toString() === productoId);

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.subtotal = productoEnCarrito.cantidad * producto.precio;
      } else {
        carrito.productos.push({
          producto: productoId,
          cantidad: cantidad,
          precio: producto.precio,
          subtotal: cantidad * producto.precio,
        });
      }
    } else {
      //Carrito nuevo para usuario que no tenga uno
      carrito = new Carrito({
        usuario: req.usuarioId,
        productos: [{
          producto: productoId,
          cantidad: cantidad,
          precio: producto.precio,
          subtotal: cantidad * producto.precio,
        }],
      });
    }
    carrito.total = carrito.productos.reduce((total, prod) => total + prod.subtotal, 0);

    await carrito.save();
    res.status(201).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar producto del carrito
const eliminarDelCarrito = async (req, res) => {
  try {
    const productoId = req.params.id;

    const carrito = await Carrito.findOneAndDelete({ producto: productoId });

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Actualizar cantidad de producto en el carrito
const actualizarCantidad = async (req, res) => {
  try {
    const productoId = req.params.id;
    const nuevaCantidad = parseInt(req.body.nuevaCantidad);

    const carrito = await Carrito.findOne({ producto: productoId });

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    carrito.cantidad = nuevaCantidad;
    await carrito.save();

    res.json({ mensaje: 'Cantidad actualizada en el carrito' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todos los productos en el carrito
const obtenerProductosEnCarrito = async (req, res) => {
  try {
    const productosEnCarrito = await Carrito.find().populate('productos.producto', 'nombre precio');
    res.json({ productosEnCarrito });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  obtenerProductosEnCarrito,
};