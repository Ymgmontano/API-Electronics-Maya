const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");


// variables de entorno
dotenv.config();


// Puerto
const PORT = process.env.PORT || 3001;
const app = express();


//DB a conectarse en Mongodb 
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Maya', 
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// uso de router.js
app.use(router);

app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});

const accountLimiter = rateLimit({
  windowMs: 100 * 60 * 1000, // 1 hora
  max: 1005, // limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
  message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
});

app.get("/usuario", accountLimiter,  (req, res) => {
  res.send('IP por muchos intentos')
});