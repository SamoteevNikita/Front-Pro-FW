// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage'; 
import ProductsPage from './pages/ProductsPage';
import PreviewPage from './pages/PreviewPage';   
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview"
          element={
            <ProtectedRoute>
              <PreviewPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
    
  );
}

export default App;