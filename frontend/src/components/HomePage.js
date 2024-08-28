import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Administración de Tienda Antojitos</h1>
            <div className="space-x-4">
                <Link to="/products" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Gestión de Productos
                </Link>
                <Link to="/clients" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Gestión de Clientes
                </Link>
                <Link to="/ventas" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Gestión de ventas
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
