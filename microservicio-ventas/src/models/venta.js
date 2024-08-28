const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    date: { type: Date, default: Date.now },
    totalVenta: { type: Number, required: true }
});

module.exports = mongoose.model('Venta', ventaSchema);