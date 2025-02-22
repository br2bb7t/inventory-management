import React from 'react';
import ProductList from './components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container mt-5">
      <h1>Gestión de Inventario</h1>
      <ProductList />
    </div>
  );
};

export default App;
