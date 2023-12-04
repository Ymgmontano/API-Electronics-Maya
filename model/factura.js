const mongoose = require("mongoose");

const FacturaSchema = new mongoose.Schema({
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carritof'
    }],
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pago'
    },
    total: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("factura", FacturaSchema);