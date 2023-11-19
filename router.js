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

//para pagos 
const {
  getPago,
  createPago,
  updatePago,
  deletePago,
} = require("./controllers/datosuser")

//para carrito
const {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  obtenerProductosEnCarrito,
} = require("./controllers/carritoCompras");

//para factura
const {
  crearFactura,
  obtenerTodasLasFacturas,
  obtenerFacturaPorId,
  eliminarFacturaPorId,
} = require("./controllers/factura");

//para favoritos
const {
  agregarAFavoritos,
  eliminarDeFavoritos,
} = require("./controllers/favoritos");


// ruta get principal
router.get("/", async (req, res) => {
  res.send("Let's build a CRUD API!");
});

//rutas para la coleccion venta
router.get("/ventas", getPago);
router.post("/ventas", createPago);
router.put("/ventas/:VentasID", updatePago);
router.delete("/ventas/:VentasID", deletePago);

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

// Rutas para la colección carrito
router.post("/carrito/agregar", agregarAlCarrito);
router.delete("/carrito/eliminar/:productoId", eliminarDelCarrito);
router.put("/carrito/actualizar/:productoId", actualizarCantidad);
router.get("/carrito", obtenerProductosEnCarrito);

// Rutas para la colección factura
router.post("/factura/crear", crearFactura);
router.get("/factura/todas", obtenerTodasLasFacturas);
router.get("/factura/:facturaId", obtenerFacturaPorId);
router.delete("/factura/eliminar/:facturaId", eliminarFacturaPorId);

// Rutas para la colección favoritos
router.post("/favoritos/agregar/:usuarioId/:productoId", agregarAFavoritos);
router.delete("/favoritos/eliminar/:usuarioId/:productoId", eliminarDeFavoritos);

module.exports = router;