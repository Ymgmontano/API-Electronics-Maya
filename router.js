const router = require("express").Router();
const verifyToken = require("./jwt");

//para usuario
const {
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  validLogin,
} = require("./controllers/usuario");

//para productos
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} = require("./controllers/producto");


//para ventas 
const {
  getVenta,
  createVenta,
  updateVenta,
  deleteVenta,
} = require("./controllers/datosuser")


// ruta get principal
router.get("/", async (req, res) => {
  res.send("Let's build a CRUD API!");
});

//rutas para la coleccion venta
router.get("/ventas", getVenta);
router.post("/ventas", createVenta);
router.put("/ventas/:VentasID", updateVenta);
router.delete("/ventas/:VentasID", deleteVenta);

//rutas para coleccion usuario
router.get("/Usuarios", verifyToken, getUsuario);
router.post("/Usuarios", createUsuario);
router.put("/Usuarios/:usuarioID", updateUsuario);
router.delete("/Usuarios/:usuarioID", deleteUsuario);
router.get("/Usuarios/:UsuarioCORREO/:UsuarioCONTRASENA", validLogin);

//rutas para coleccion producto
router.get("/productos", obtenerProductos);
router.get("/productos/:idProducto", obtenerProductoPorId);
router.post("/productos", crearProducto);
router.put("/productos/:idProducto", actualizarProducto);
router.delete("/productos/:idProducto", eliminarProducto);

module.exports = router;
