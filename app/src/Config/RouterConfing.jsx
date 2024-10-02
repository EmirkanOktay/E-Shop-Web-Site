import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import ProductDetails from '../compenents/ProductDetails';

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
    );
}

export default RouterConfig;
