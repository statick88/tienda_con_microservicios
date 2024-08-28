import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVentas, deleteVenta } from '../services/ventaService';
import { getClients } from '../services/clientServices';
import { getProducts } from '../services/productService';


const VentaList = () => {
    const [ventas, setVentas] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]); // Estado para productos
    const [expandedVenta, setExpandedVenta] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await getVentas();
                setVentas(response.data);
            } catch (error) {
                console.error('Error fetching ventas:', error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await getClients();
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        const fetchProducts = async () => { // Función para obtener productos
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchVentas();
        fetchProducts();
        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('¿Estás seguro de eliminar esta venta?');
        if (confirmed) {
            try {
                await deleteVenta(id);
                setVentas(ventas.filter(venta => venta._id !== id));
            } catch (error) {
                console.error('Error deleting venta:', error);
            }
        }
    };

    // Mapear los nombres de los clientes
    const getClientNameById = (id) => {
        const client = clients.find(client => client._id === id);
        return client ? client.name : 'Desconocido';
    };

    const getProductNameById = (id) => {
        const product = products.find(product => product._id === id);
        return product ? product.name : 'Desconocido';
    };

    // Calcular el total de una venta
    const calculateTotal = (detalles) => {
        return detalles.reduce((total, detalle) => total + (detalle.price), 0);
    };

    const toggleDetails = (ventaId) => {
        setExpandedVenta(expandedVenta === ventaId ? null : ventaId);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Lista de Ventas</h2>
            <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Cliente</th>
                        <th className="py-2 px-4 border-b">Fecha</th>
                        <th className="py-2 px-4 border-b">Total Venta</th>
                        <th className="py-2 px-4 border-b">Detalles</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta._id}>
                            <td className="py-2 px-4 border-b">{getClientNameById(venta.clientId)}</td>
                            <td className="py-2 px-4 border-b">{new Date(venta.date).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{calculateTotal(venta.detalles).toFixed(2)}</td> {/* Mostrar total */}
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => toggleDetails(venta._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {expandedVenta === venta._id ? 'Ocultar Detalles' : 'Ver Detalles'}
                                </button>
                                {expandedVenta === venta._id && (
                                    <ul className="mt-2 bg-gray-100 border rounded p-2">
                                        {venta.detalles.map(detalle => (
                                            <li key={detalle._id} className="py-1">
                                                {getProductNameById(detalle.productId)}, Cantidad: {detalle.quantity}, Precio: {detalle.price}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleDelete(venta._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => navigate('/add-venta')}
                className="m-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Agregar Venta
            </button>
            <button
                onClick={() => navigate('/')}
                className="m-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Menú Principal
            </button>
        </div>
    );
};

export default VentaList;
