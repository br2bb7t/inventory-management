import React, { useState, useEffect } from 'react';  
import { addProduct, updateProduct } from '../api'; 
import '../styles/ProductForm.css';

const ProductForm = ({ product, setEditingProduct, onProductSaved, setSuccessMessage, setErrorMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'price' || name === 'stock' ? parseInt(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (isNaN(formData.price) || formData.price <= 0) {
      setErrorMessage('El precio debe ser un número mayor que cero.');
      return;
    }

    if (isNaN(formData.stock) || formData.stock < 0) {
      setErrorMessage('La cantidad en stock debe ser un número válido.');
      return;
    }

    try {
      if (product) {
        await updateProduct(product.id, formData);
        setSuccessMessage('Producto actualizado con éxito');
      } else {
        await addProduct(formData);
        setSuccessMessage('Producto agregado con éxito');
      }

      if (typeof onProductSaved === 'function') {
        onProductSaved();
      }

      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
      });

      if (typeof setEditingProduct === 'function') {
        setEditingProduct(null);
      }

      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error al guardar el producto:', error);
      setErrorMessage('Error al guardar el producto');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Nombre del Producto"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          type="number"
          name="stock"
          placeholder="Cantidad en Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
        />
        <button type="submit">{product ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      </form>
    </>
  );
};

export default ProductForm;
