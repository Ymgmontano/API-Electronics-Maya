const CarritoA = require('../model/carritoA');
const Producto = require('../model/productosA');

const agregarAlCarritoA = async (req, res) => {
  try {
    const productoId = req.body.productoId;

    const producto = await Producto.findById(productoId);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    let carrito = await CarritoA.findOne({ usuario: req.usuarioId });

    if (carrito) {
      const productoEnCarrito = carrito.productos.find(prod => prod.miId === productoId);

      if (!productoEnCarrito) {
        carrito.productos.push({
          miId: productoId,
          title: producto.title,
          price: producto.price,
          image: producto.image,
        });
      }
    } else {
      carrito = new CarritoA({
        usuario: req.usuarioId,
        productos: [{
          miId: productoId,
          title: producto.title,
          price: producto.price,
          image: producto.image,
        }],
      });
    }

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
      { $pull: { productos: { miId: productoId } } },
      { new: true }
    );

    if (!carrito) {
      throw new Error('Producto no encontrado en el carrito');
    }

    res.json({ mensaje: 'Producto eliminado del carrito' });
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
  obtenerProductosEnCarritoA,
};