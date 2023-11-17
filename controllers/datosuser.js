const Ventas = require("../model/datosUsuarios");
// Obtener todos los objetos de restaurante
const getVenta = async (req, res) => {
    Ventas.find((err, ventas) => {
        if (err) {
            res.send(err);
        }
        res.json(ventas);
    });
};
// Crear un objeto con el formato indicado del restaurante
const createVenta = async (req, res) => {
    const Venta = new Ventas({
        Nombre: req.body.Nombre,
        Correo: req.body.Correo,
        Telefono: req.body.Telefono,
        Pais: req.body.Pais,
        Municipio: req.body.Municipio,
        CP: req.body.CP,
        Direccion: req.body.Direccion,
    });

    Venta.save(async (err, ventas) => {
        if (err) {
            res.send(err);
        }
        res.json(ventas);
    });
};
const updateVenta = async (req, res) => {
    Venta.findOneAndUpdate(
        { _id: req.params.Nombre },
        {
            $set: {
                Nombre: req.body.Nombre,
                Correo: req.body.Correo,
                Telefono: req.body.Telefono,
                Pais: req.body.Pais,
                Municipio: req.body.Municipio,
                CP: req.body.CP,
                Direccion: req.body.Direccion,
            },
        },
        { new: true },
        (err, ventas) => {
            if (err) {
                res.send(err);
            } else res.json(ventas);
        }
    );
};
// borrar un elemento a través del _id de ingrediente
const deleteVenta = async (req, res) => {
    Venta.deleteOne({ _id: req.params.ventasID })
        .then(() => res.json({ message: "Restaurante eliminado" }))
        .catch((err) => res.send(err));
};
module.exports = {
    getVenta,
    createVenta,
    updateVenta,
    deleteVenta,
};