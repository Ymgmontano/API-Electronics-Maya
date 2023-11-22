/*const Producto = require('../models/product');

//creacion de producto
async function crearProducto(dataProducto) {
  try {
    const nuevoProducto = new Producto(dataProducto);
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
    const productos = await productos.find();
    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

//Obtencion de producto mediante ID
async function obtenerProductoPorId(id) {
  try {
    const producto = await producto.findById(id);
    return producto;
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    throw error;
  }
}

//Actualizacion de producto
async function actualizarProducto(id, newDataProducto) {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(id, newDataProducto, { new: true });
    return productoActualizado;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
}

//Eliminacion de producto
async function eliminarProducto(id) {
  try {
    await Producto.findByIdAndDelete(id);
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
};*/

const Producto = require('../model/producto');

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto({
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      precio: req.body.precio,
      capacidad: req.body.capacidad,
      marca: req.body.marca,
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
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

const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};