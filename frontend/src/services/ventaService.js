import axios from 'axios';

const API_URL = 'http://localhost:5002/api/ventas';

export const getVentas = () => {
    return axios.get(API_URL);
};

export const getVentaById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createVenta = (venta) => {
    return axios.post(API_URL, venta);
};

export const updateVenta = (id, venta) => {
    // Implementar si se necesita un endpoint PUT para actualizar ventas
    return axios.put(`${API_URL}/${id}`, venta);
};

export const deleteVenta = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const getVentasByCliente = (clienteId) => {
    return axios.get(`${API_URL}/cliente/${clienteId}`);
};

