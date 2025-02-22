import React, { useEffect, useState } from 'react'; 
import { getProducts, deleteProduct } from '../api'; 
import ProductForm from './ProductForm';
import { Alert } from 'react-bootstrap';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      setErrorMessage('No se pudieron cargar los productos');
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setSuccessMessage('Producto eliminado con éxito');
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setErrorMessage('Error al eliminar el producto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleProductSaved = () => {
    fetchProducts();
  };

  setTimeout(() => {
    setSuccessMessage('');
    setErrorMessage('');
  }, 3000);

  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>

      {/* Contenedor fijo para las alertas */}
      <div className="alert-container">
        {successMessage && (
          <Alert variant="success" className="mt-3">
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}
      </div>

      <table className="product-table table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Cantidad en Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(product)}>Editar</button>

                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pasamos las funciones de setSuccessMessage y setErrorMessage al ProductForm */}
      <ProductForm 
        product={editingProduct} 
        setEditingProduct={setEditingProduct} 
        onProductSaved={handleProductSaved} 
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default ProductList;
