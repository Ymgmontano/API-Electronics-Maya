const mongoose = require("mongoose");

const Carritof = new mongoose.Schema({
   miId: {
     type: String,
     required: false,
     unique: true
   },

   title: String,
   image: String,
   price: Number
 });

module.exports = mongoose.model("carritof", Carritof);