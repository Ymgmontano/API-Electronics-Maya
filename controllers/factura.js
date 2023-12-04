const Factura = require("../model/factura");

const generarFactura = async (req, res) => {
    try {
        const fechaActual = new Date();

        const nuevaFactura = new Factura({
            productos: req.body.productos,
            cliente: req.body.cliente,
            total: req.body.total,
            fecha: fechaActual,
        });

        const facturaGenerada = await nuevaFactura.save();
        res.status(201).json(facturaGenerada);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

module.exports = {
    generarFactura,
};