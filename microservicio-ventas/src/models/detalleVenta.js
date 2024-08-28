const mongoose = require('mongoose');

const detalleVentaSchema = new mongoose.Schema({
    ventaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venta', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('DetalleVenta', detalleVentaSchema);
