import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClients, deleteClient } from '../services/clientServices';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients();
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('¿Estás seguro de eliminar este cliente?');
        if (confirmed) {
            try {
                await deleteClient(id);
                setClients(clients.filter(client => client._id !== id));
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Lista de Clientes</h2>
            <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Apellido</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Teléfono</th>
                        <th className="py-2 px-4 border-b">Dirección</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client._id}>
                            <td className="py-2 px-4 border-b">{client.name}</td>
                            <td className="py-2 px-4 border-b">{client.apellido}</td>
                            <td className="py-2 px-4 border-b">{client.email}</td>
                            <td className="py-2 px-4 border-b">{client.phone || 'N/A'}</td>
                            <td className="py-2 px-4 border-b">{client.address || 'N/A'}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => navigate(`/edit-client/${client._id}`)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(client._id)}
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
                onClick={() => navigate('/add-client')}
                className="m-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Agregar Cliente
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

export default ClientList;
