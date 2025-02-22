import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { getProducts, deleteProduct } from '../api';

jest.mock('../api', () => ({
  getProducts: jest.fn(),
  deleteProduct: jest.fn(),
}));

describe('ProductList Component', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it('should display an error when products cannot be loaded', async () => {
    getProducts.mockRejectedValue(new Error('Error al cargar productos'));

    render(<ProductList />);

    await waitFor(() => expect(screen.getByText('No se pudieron cargar los productos')).toBeInTheDocument());
  });

  test('should load and display products', async () => {
    const mockProducts = [
      { id: 1, name: 'Producto 1', category: 'Categoría 1', price: 100, stock: 10 },
      { id: 2, name: 'Producto 2', category: 'Categoría 2', price: 200, stock: 20 },
    ];

    getProducts.mockResolvedValue(mockProducts);

    render(<ProductList />);

    await waitFor(() => expect(screen.getByText('Producto 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Producto 2')).toBeInTheDocument());
  });

  it('should delete a product', async () => {
    const products = [{ id: 1, name: 'Producto 1', category: 'Categoría 1', price: 100, stock: 10 }];
    getProducts.mockResolvedValue(products);
    deleteProduct.mockResolvedValue();

    render(<ProductList />);

    await waitFor(() => expect(screen.getByText('Producto 1')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Eliminar'));

    getProducts.mockResolvedValue([]);

    await waitFor(() => expect(screen.queryByText('Producto 1')).not.toBeInTheDocument());
  });
  

  test('should display error message when products fail to load', async () => {
    getProducts.mockRejectedValue(new Error('Error al cargar productos'));

    render(<ProductList />);

    await waitFor(() => expect(screen.getByText('No se pudieron cargar los productos')).toBeInTheDocument());
  });

  test('should display success message when product is deleted', async () => {
    const mockProducts = [
      { id: 1, name: 'Producto 1', category: 'Categoría 1', price: 100, stock: 10 },
    ];

    getProducts.mockResolvedValue(mockProducts);
    deleteProduct.mockResolvedValue({});

    render(<ProductList />);

    await waitFor(() => expect(screen.getByText('Producto 1')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Eliminar'));

    await waitFor(() => expect(screen.getByText('Producto eliminado con éxito')).toBeInTheDocument());
  });
});
