import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from '../components/ProductForm';
import axios from 'axios';

jest.mock('axios');

const setErrorMessage = jest.fn();
const setSuccessMessage = jest.fn();
const setEditingProduct = jest.fn();
const onProductSaved = jest.fn();

beforeAll(() => {
  global.alert = jest.fn();
});

describe('Pruebas para el formulario de productos', () => {
  it('no muestra un mensaje de error cuando el producto se guarda correctamente', async () => {
    axios.post.mockResolvedValue({ data: { id: 1, name: 'Nuevo Producto', category: 'Categoría 1', price: 100, stock: 50 } });
  
    render(<ProductForm 
      product={null} 
      setEditingProduct={setEditingProduct}
      onProductSaved={onProductSaved}
      setSuccessMessage={setSuccessMessage}
      setErrorMessage={setErrorMessage} 
    />);
  
    fireEvent.change(screen.getByPlaceholderText('Nombre del Producto'), { target: { value: 'Nuevo Producto' } });
    fireEvent.change(screen.getByPlaceholderText('Categoría'), { target: { value: 'Categoría 1' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: 100 } });
    fireEvent.change(screen.getByPlaceholderText('Cantidad en Stock'), { target: { value: 50 } });
  
    fireEvent.click(screen.getByText('Agregar Producto'));
  
    await waitFor(() => {
      expect(screen.queryByText('Error al guardar el producto')).not.toBeInTheDocument();
    });
  });
  
  it('llama a updateProduct cuando se está editando un producto', async () => {
    const product = {
      id: 1,
      name: 'Producto 1',
      category: 'Categoría 1',
      price: 100,
      stock: 50,
    };

    axios.put.mockResolvedValue({ data: product });

    render(<ProductForm 
      product={product}
      setEditingProduct={setEditingProduct}
      onProductSaved={onProductSaved}
      setSuccessMessage={setSuccessMessage}
      setErrorMessage={setErrorMessage} 
    />);

    fireEvent.change(screen.getByPlaceholderText('Nombre del Producto'), { target: { value: 'Producto Actualizado' } });
    fireEvent.change(screen.getByPlaceholderText('Categoría'), { target: { value: 'Categoría Actualizada' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: 250 } });
    fireEvent.change(screen.getByPlaceholderText('Cantidad en Stock'), { target: { value: 30 } });

    fireEvent.click(screen.getByText('Actualizar Producto'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3001/api/products/1', {
        id: 1,
        name: 'Producto Actualizado',
        category: 'Categoría Actualizada',
        price: 250,
        stock: 30,
      });
    });
  });
});
