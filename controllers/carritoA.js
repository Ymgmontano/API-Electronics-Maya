const CarritoA = require('../model/carritoA');
const Producto = require('../model/productosA');

const agregarAlCarritoA = async (req, res) => {
  try {
    const productoId = req.body.productoId;
    const cantidad = parseInt(req.body.cantidad);

    const producto = await Producto.findById(productoId);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    let carrito = await CarritoA.findOne({ usuario: req.usuarioId });

    if (carrito) {
      const productoEnCarrito = carrito.productos.find(prod => prod.id === productoId);

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.subtotal = productoEnCarrito.cantidad * producto.price;
      } else {
        carrito.productos.push({
          id: productoId,
          title: producto.title,
          description: producto.description,
          price: producto.price,
          image: producto.image,
          subtotal: cantidad * producto.price,
        });
      }
    } else {
      carrito = new CarritoA({
        usuario: req.usuarioId,
        productos: [{
          id: productoId,
          title: producto.title,
          description: producto.description,
          price: producto.price,
          image: producto.image,
          subtotal: cantidad * producto.price,
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

const eliminarDelCarritoA = async (req, res) => {
  try {
    const productoId = req.params.id;

    const carrito = await CarritoA.findOneAndUpdate(
      { usuario: req.usuarioId },
      { $pull: { productos: { id: productoId } } },
      { new: true }
    );

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    carrito.total = carrito.productos.reduce((total, prod) => total + prod.subtotal, 0);
    await carrito.save();

    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const actualizarCantidadA = async (req, res) => {
  try {
    const productoId = req.params.id;
    const nuevaCantidad = parseInt(req.body.nuevaCantidad);

    const carrito = await CarritoA.findOne({ usuario: req.usuarioId, 'productos.id': productoId });

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    const productoEnCarrito = carrito.productos.find(prod => prod.id === productoId);
    productoEnCarrito.cantidad = nuevaCantidad;
    productoEnCarrito.subtotal = productoEnCarrito.price * nuevaCantidad;

    carrito.total = carrito.productos.reduce((total, prod) => total + prod.subtotal, 0);

    await carrito.save();

    res.json({ mensaje: 'Cantidad actualizada en el carrito' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const obtenerProductosEnCarritoA = async (req, res) => {
  try {
    const productosEnCarrito = await CarritoA.findOne({ usuario: req.usuarioId });
    res.json({ productosEnCarrito });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  agregarAlCarritoA,
  eliminarDelCarritoA,
  actualizarCantidadA,
  obtenerProductosEnCarritoA,
};