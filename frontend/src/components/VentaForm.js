import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVenta, updateVenta, getVentaById } from '../services/ventaService';
import { getProducts } from '../services/productService';
import { getClients } from '../services/clientServices';

const VentaForm = () => {
    const [venta, setVenta] = useState({ clientId: '', date: '', detalles: [] });
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [newDetail, setNewDetail] = useState({ productId: '', quantity: '', price: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, clientResponse] = await Promise.all([
                    getProducts(),
                    getClients()
                ]);
                setProducts(productResponse.data);
                setClients(clientResponse.data);

                if (id) {
                    const ventaResponse = await getVentaById(id);
                    setVenta(ventaResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setVenta({ ...venta, [e.target.name]: e.target.value });
    };

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setNewDetail(prevDetail => {
            const updatedDetail = { ...prevDetail, [name]: value };

            // Actualizar el precio basado en la cantidad y el precio del producto
            if (name === 'quantity' && updatedDetail.productId) {
                const selectedProduct = products.find(p => p._id === updatedDetail.productId);
                const price = selectedProduct ? selectedProduct.price * value : 0;
                updatedDetail.price = price;
            }
            
            return updatedDetail;
        });
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewDetail(prevDetail => {
            const updatedDetail = { ...prevDetail, [name]: value };

            if (name === 'productId') {
                const selectedProduct = products.find(p => p._id === value);
                const price = selectedProduct ? selectedProduct.price * newDetail.quantity : 0;
                updatedDetail.price = price;
            }
            
            return updatedDetail;
        });
    };

    
    const handleAddDetail = () => {
        setVenta(prevVenta => ({
            ...prevVenta,
            detalles: [...prevVenta.detalles, newDetail]
        }));
        setNewDetail({ productId: '', quantity: '', price: '' }); 
    };

    const handleRemoveDetail = (index) => {
        setVenta(prevVenta => ({
            ...prevVenta,
            detalles: prevVenta.detalles.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (id) {
                await updateVenta(id, venta);
            } else {
                await createVenta(venta);
            }
            navigate('/ventas'); // Redirigir a la lista de ventas después de guardar
        } catch (error) {
            console.error('Error saving venta:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Venta' : 'Agregar Venta'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="clientId"
                    value={venta.clientId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Seleccionar Cliente</option>
                    {clients.map(client => (
                        <option key={client._id} value={client._id}>
                            {client.name}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="date"
                    value={venta.date.substring(0, 10)} // Asume que la fecha está en formato ISO
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Detalles de Venta</h3>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                            <select
                                name="productId"
                                value={newDetail.productId}
                                onChange={handleProductChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Seleccionar Producto</option>
                                {products.map(product => (
                                    <option key={product._id} value={product._id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="quantity"
                                value={newDetail.quantity}
                                onChange={handleDetailChange}
                                placeholder="Cantidad"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={newDetail.price}
                                onChange={handleDetailChange}
                                placeholder="Precio"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled // El precio se calcula automáticamente
                            />
                            <button
                                type="button"
                                onClick={handleAddDetail}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Añadir Detalle
                            </button>
                        </div>

                        {venta.detalles.map((detalle, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <span>{products.find(p => p._id === detalle.productId)?.name || 'Desconocido'}</span>
                                <span>{detalle.quantity}</span>
                                <span>{detalle.price}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveDetail(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Guardar
                    </button>
                    <button type="button" onClick={() => navigate('/ventas')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VentaForm;
