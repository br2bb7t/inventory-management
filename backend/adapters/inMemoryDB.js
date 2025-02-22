const { v4: uuidv4 } = require('uuid');

let products = new Map();

const save = async (product) => {
  const id = uuidv4();
  const newProduct = { id, ...product };
  products.set(id, newProduct);
  return newProduct;
};

const getAll = async () => {
  return Array.from(products.values());
};

const getById = async (id) => {
  return products.has(id) ? products.get(id) : null;
};

const update = async (id, updatedProduct) => {
  if (!products.has(id)) {
    return null;
  }
  const currentProduct = products.get(id);
  const updated = { ...currentProduct, ...updatedProduct };
  products.set(id, updated);
  return updated;
};

const remove = async (id) => {
  if (!products.has(id)) {
    return null;
  }
  const deletedProduct = products.get(id);
  products.delete(id);
  return deletedProduct;
};

module.exports = {
  save,
  getAll,
  getById,
  update,
  remove,
};
