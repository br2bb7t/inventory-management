const productRepo = require('../adapters/inMemoryDB');

const validateProductData = (product) => {
  if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
    throw new Error('El nombre del producto es obligatorio y debe ser una cadena no vacía.');
  }

  if (product.category && typeof product.category !== 'string') {
    throw new Error('La categoría del producto debe ser una cadena de texto.');
  }

  if (!product.price || typeof product.price !== 'number' || product.price <= 0) {
    throw new Error('El precio del producto es obligatorio y debe ser un número mayor que cero.');
  }

  if (!product.stock || typeof product.stock !== 'number' || product.stock <= 0) {
    throw new Error('La cantidad de stock es obligatorio y debe ser un número mayor que cero.');
  }
};

const createProduct = async (product) => {
  try {
    validateProductData(product);

    return await productRepo.save(product);
  } catch (error) {
    throw {
      statusCode: 400,
      message: error.message || 'Error al crear el producto.',
    };
  }
};

const getAllProducts = async () => {
  try {
    const products = await productRepo.getAll();
    return products;
  } catch (error) {
    throw {
      statusCode: 500,
      message: 'Error al obtener los productos.',
    };
  }
};

const updateProduct = async (id, updatedProduct) => {
  try {
    validateProductData(updatedProduct);

    const product = await productRepo.getById(id);
    if (!product) {
      throw {
        statusCode: 404,
        message: 'Producto no encontrado.',
      };
    }

    return await productRepo.update(id, updatedProduct);
  } catch (error) {
    throw {
      statusCode: error.statusCode || 400,
      message: error.message || 'Error al actualizar el producto.',
    };
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await productRepo.getById(id);
    if (!product) {
      throw {
        statusCode: 404,
        message: 'Producto no encontrado.',
      };
    }

    return await productRepo.remove(id);
  } catch (error) {
    throw {
      statusCode: error.statusCode || 400,
      message: error.message || 'Error al eliminar el producto.',
    };
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
