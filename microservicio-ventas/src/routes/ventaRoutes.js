const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.post('/', ventaController.crearVenta);
router.get('/', ventaController.obtenerVentasConDetalles);
router.get('/cliente/:clienteId', ventaController.obtenerVentasPorCliente);
router.delete('/:ventaId', ventaController.eliminarVenta);
router.get('/:ventaId', ventaController.obtenerVentaPorId); 



module.exports = router;
