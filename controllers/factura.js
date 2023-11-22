/*const Factura = require('../models/factura');

// Crear factura
async function crearFactura(dataFactura) {
  try {
    const nuevaFactura = new Factura(dataFactura);
    const facturaGuardada = await nuevaFactura.save();
    return facturaGuardada;
  } catch (error) {
    console.error('Error al crear factura:', error);
    throw error;
  }
}

// Obtener todas las facturas
async function obtenerTodasLasFacturas() {
  try {
    const facturas = await Factura.find();
    return facturas;
  } catch (error) {
    console.error('Error al obtener todas las facturas:', error);
    throw error;
  }
}

// Obtener factura por ID
async function obtenerFacturaPorId(id) {
  try {
    const factura = await Factura.findById(id);
    return factura;
  } catch (error) {
    console.error('Error al obtener factura por ID:', error);
    throw error;
  }
}

// Eliminar factura por ID
async function eliminarFacturaPorId(id) {
  try {
    await Factura.findByIdAndDelete(id);
    return { mensaje: 'Factura eliminada exitosamente' };
  } catch (error) {
    console.error('Error al eliminar factura:', error);
    throw error;
  }
}

module.exports = {
  crearFactura,
  obtenerTodasLasFacturas,
  obtenerFacturaPorId,
  eliminarFacturaPorId,
};*/

const Factura = require('../model/factura');

// Crear factura
const crearFactura = async (req, res) => {
  try {
    const nuevaFactura = new Factura({
      carrito: req.body.carrito,
      pago: req.body.pago,
      total: req.body.total,
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