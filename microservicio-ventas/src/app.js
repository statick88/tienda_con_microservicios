require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/ventas', ventaRoutes);

// Puerto
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
