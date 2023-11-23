const mongoose = require("mongoose");

const Carritof = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: String,
    },
});

module.exports = mongoose.model("carritof", Carritof);