const Factura = require('../model/factura');
const Carrito = require('../model/carritoCompras');

const crearFactura = async (req, res) => {
  try {
    const carritoId = req.body.carrito;

    const carrito = await Carrito.findById(carritoId).populate('productos.producto');

    if (!carrito) {
      throw new Error('Carrito no encontrado');
    }

    let totalFactura = 0;
    carrito.productos.forEach(producto => {
      totalFactura += producto.subtotal;
    });

    const nuevaFactura = new Factura({
      carrito: carritoId,
      pago: req.body.pago,
      total: totalFactura,
    });

    const facturaGuardada = await nuevaFactura.save();
    res.status(201).json(facturaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todas las facturas
const obtenerTodasLasFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener factura por ID
const obtenerFacturaPorId = async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id);
    console.log('Factura encontrada:', factura);
    if (!factura) {
      return res.status(404).json({ mensaje: 'Factura no encontrada' });
    }
    res.json(factura);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Eliminar factura por ID
const eliminarFacturaPorId = async (req, res) => {
  try {
    const eliminada = await Factura.findByIdAndDelete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ mensaje: 'Factura no encontrada' });
    }
    res.json({ mensaje: 'Factura eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  crearFactura,
  obtenerTodasLasFacturas,
  obtenerFacturaPorId,
  eliminarFacturaPorId,
};