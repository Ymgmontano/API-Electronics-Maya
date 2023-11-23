const ProductosA = require('../model/productosA');

const obtenerProductosA = async (req, res) => {
  try {
    const listaProductosA = await ProductosA.find();
    res.json(listaProductosA);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const crearNuevoProductoA = async (req, res) => {
  try {
    const { id, title, price, image } = req.body;

    const nuevoProductoA = new ProductosA({
      id,
      title,
      price,
      image,
    });

    const productoGuardado = await nuevoProductoA.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const actualizarProductoAExistente = async (req, res) => {
  try {
    const productoActualizado = await ProductosA.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const eliminarProductoAExistente = async (req, res) => {
  try {
    const eliminado = await ProductosA.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  obtenerProductosA,
  crearNuevoProductoA,
  actualizarProductoAExistente,
  eliminarProductoAExistente,
};