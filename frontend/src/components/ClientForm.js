import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient, updateClient, getClientById } from '../services/clientServices';

const ClientForm = () => {
    const [client, setClient] = useState({ name: '', apellido: '', email: '', phone: '', address: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                try {
                    const response = await getClientById(id);
                    setClient(response.data);
                } catch (error) {
                    console.error('Error fetching client:', error);
                }
            };

            fetchClient();
        }
    }, [id]);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateClient(id, client);
            } else {
                await createClient(client);
            }
            navigate('/clients'); // Redirigir a la lista de clientes después de guardar
        } catch (error) {
            console.error('Error saving client:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={client.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    value={client.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={client.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={client.phone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="address"
                    value={client.address}
                    onChange={handleChange}
                    placeholder="Dirección"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Guardar
                    </button>
                    <button type="button" onClick={() => navigate('/clients')} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientForm;
