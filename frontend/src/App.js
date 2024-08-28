import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import VentaList from './components/VentaList';
import VentaForm from './components/VentaForm';
import VentaDetails from './components/VentaDetails';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<ProductForm />} />
                <Route path="/edit-product/:id" element={<ProductForm />} />
                <Route path="/clients" element={<ClientList />} />
                <Route path="/add-client" element={<ClientForm />} />
                <Route path="/edit-client/:id" element={<ClientForm />} />
                <Route path="/ventas" element={<VentaList />} />
                <Route path="/add-venta" element={<VentaForm />} />
                <Route path="/venta/:id" element={<VentaDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
