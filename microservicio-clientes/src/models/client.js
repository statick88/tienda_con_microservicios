const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    apellido: { type: String, required: true },
    phone: String,
    address: String,
});

module.exports = mongoose.model('Client', clientSchema);
