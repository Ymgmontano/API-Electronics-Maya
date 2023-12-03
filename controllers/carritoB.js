const carritof = require("../model/CarritoB");

const getCarrito = async (req, res) => {
    try {
        const carrito = await carritof.find();
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createCarrito = async (req, res) => {
   try {
       const nuevoProducto = new carritof({
           miId: req.body.miId,
           title: req.body.title,
           image: req.body.image,
           price: req.body.price,
       });

       const productoGuardado = await nuevoProducto.save();
       res.status(201).json(productoGuardado);
   } catch (error) {
       res.status(400).json({ mensaje: error.message });
   }
};

const deleteProductoById = async (req, res) => {
    try {
        const { miId } = req.params;
        
        const eliminado = await carritof.findOneAndDelete({ id : miId }); 
 
        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });
        }
 
        res.json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
 };
 
 module.exports = {
     getCarrito,
     createCarrito,
     deleteProductoById,
 };