const productService = require('../domain/productService');
const productRepo = require('../adapters/inMemoryDB');
jest.mock('../adapters/inMemoryDB');

describe('productService', () => {
  it('debería crear un nuevo producto', async () => {
    const newProduct = { id: '1', name: 'Producto 1', category: 'Categoría A', price: 100, stock: 50 };
    productRepo.save.mockResolvedValue(newProduct);

    const result = await productService.createProduct(newProduct);
    expect(result).toEqual(newProduct);
  });

  it('debería obtener todos los productos', async () => {
    const products = [{ id: '1', name: 'Producto 1', category: 'Categoría A', price: 100, stock: 50 }];
    productRepo.getAll.mockResolvedValue(products);

    const result = await productService.getAllProducts();
    expect(result).toEqual(products);
  });
});
