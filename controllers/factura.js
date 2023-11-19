const Factura = require('../models/factura');

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
};