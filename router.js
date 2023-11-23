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
  obtenerProductos,
  crearProducto,
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

//para productosA
const {
  obtenerProductosA,
  crearNuevoProductoA,
  actualizarProductoAExistente,
  eliminarProductoAExistente,
} = require("./controllers/productosA");

//para carritoA
const {
  agregarAlCarritoA,
  eliminarDelCarritoA,
  obtenerProductosEnCarritoA,
} = require("./controllers/carritoA");

//para carritoF
const{
  getCarrito,
  createCarrito,
} = require ("./controllers/carritoB");

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

// Rutas para la colección ProductosA
router.get('/productosA', obtenerProductosA);
router.post('/productosA', crearNuevoProductoA);
router.put('/productosA/:id', actualizarProductoAExistente);
router.delete('/productosA/:id', eliminarProductoAExistente);

//Ruta para la coleccion CarritoA
router.post('/carritoA/agregar',agregarAlCarritoA);
router.delete('/carritoA/eliminar/:id',eliminarDelCarritoA);
router.get('/carritoA',obtenerProductosEnCarritoA);

//Ruta para la coleccion CarritoF
router.get('/carf',getCarrito);
router.post('/carf',createCarrito);

module.exports = router;