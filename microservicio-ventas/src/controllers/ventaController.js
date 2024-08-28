const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleVenta');


exports.crearVenta = async (req, res) => {
    const { clientId, date, detalles } = req.body; 
    try {
        // Crear la venta
        const nuevaVenta = new Venta({
            clientId,
            date
        });
        const ventaGuardada = await nuevaVenta.save();

        // Crear los detalles de la venta
        const detallesVentas = detalles.map(detalle => ({
            ventaId: ventaGuardada._id,
            productId: detalle.productId,
            quantity: detalle.quantity,
            price: detalle.price
        }));

        await DetalleVenta.insertMany(detallesVentas);

        res.status(201).json({ mensaje: 'Venta creada exitosamente', venta: ventaGuardada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la venta', error });
    }
};


exports.obtenerVentasConDetalles = async (req, res) => {
    try {
        // Obtener todas las ventas
        const ventas = await Venta.find().lean();

        // Obtener todos los detalles de ventas asociados a las ventas encontradas
        const detalles = await DetalleVenta.find().lean();

        // Mapear los detalles de ventas a cada venta
        const ventasConDetalles = ventas.map(venta => {
            return {
                ...venta,
                detalles: detalles.filter(detalle => detalle.ventaId.equals(venta._id))
            };
        });

        res.status(200).json(ventasConDetalles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las ventas', error });
    }
};


exports.obtenerVentasPorCliente = async (req, res) => {
    const { clienteId } = req.params;

    try {
        // Obtener todas las ventas del cliente especificado
        const ventas = await Venta.find({ clientId: clienteId }).lean();

        // Obtener todos los detalles de ventas asociadas a las ventas encontradas
        const detalles = await DetalleVenta.find({ ventaId: { $in: ventas.map(venta => venta._id) } }).lean();

        // Mapear los detalles de ventas a cada venta
        const ventasConDetalles = ventas.map(venta => {
            return {
                ...venta,
                detalles: detalles.filter(detalle => detalle.ventaId.equals(venta._id))
            };
        });

        res.status(200).json(ventasConDetalles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las ventas del cliente', error });
    }
};


exports.eliminarVenta = async (req, res) => {
    const { ventaId } = req.params;

    try {
        // Eliminar los detalles asociados a la venta
        await DetalleVenta.deleteMany({ ventaId });

        // Eliminar la venta
        const resultado = await Venta.findByIdAndDelete(ventaId);

        if (!resultado) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }

        res.status(200).json({ mensaje: 'Venta eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la venta', error });
    }
};

exports.obtenerVentaPorId = async (req, res) => {
    const { ventaId } = req.params;

    try {
        const venta = await Venta.findById(ventaId).lean();
        if (!venta) {
            return res.status(404).json({ mensaje: 'Venta no encontrada' });
        }

        const detalles = await DetalleVenta.find({ ventaId }).lean();
        res.status(200).json({ ...venta, detalles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la venta', error });
    }
};