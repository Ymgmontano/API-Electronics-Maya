const Pago = require("../model/datosUsuarios");

// Obtener todos los pagos
const getPago = async (req, res) => {
  try {
    const pagos = await Pago.find();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Crear un pago con el formato indicado
const createPago = async (req, res) => {
  try {
    const nuevoPago = new Pago({
      Nombre: req.body.Nombre,
      Correo: req.body.Correo,
      Telefono: req.body.Telefono,
      Pais: req.body.Pais,
      Municipio: req.body.Municipio,
      CP: req.body.CP,
      Direccion: req.body.Direccion,
    });

    const pagoGuardado = await nuevoPago.save();
    res.status(201).json(pagoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Actualizar un pago por ID
const updatePago = async (req, res) => {
  try {
    const pagoActualizado = await Pago.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!pagoActualizado) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }
    res.json(pagoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Borrar un pago por ID
const deletePago = async (req, res) => {
  try {
    const eliminado = await Pago.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }
    res.json({ message: "Pago eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  getPago,
  createPago,
  updatePago,
  deletePago,
};