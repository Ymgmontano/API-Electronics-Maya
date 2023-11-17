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

module.exports = router;
