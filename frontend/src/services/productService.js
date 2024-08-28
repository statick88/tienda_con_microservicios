import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getProducts = () => axios.get(API_URL);
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
export const createProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
export const updateProductStock = async (productId, quantity) => {
    try {
        await axios.patch(`${API_URL}/stock/${productId}`, { quantity });
    } catch (error) {
        console.error('Error updating product stock:', error);
        throw error;
    }
};