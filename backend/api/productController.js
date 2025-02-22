const productService = require('../domain/productService');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error al obtener los productos.',
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 400).json({
      message: error.message || 'Error al crear el producto.',
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 400).json({
      message: error.message || 'Error al actualizar el producto.',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 400).json({
      message: error.message || 'Error al eliminar el producto.',
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
