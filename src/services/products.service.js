const { productsModel } = require('../models');
const { validateProductBody } = require('./validations/inputValidations');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const findByQuery = async (query) => {
  const products = await productsModel.findByQuery(query);
  return { type: '', message: products };
};

const createProduct = async (productBody) => {
  const error = validateProductBody(productBody);
  if (error.type) return error;

  const newProduct = await productsModel.insert(productBody.name);
  return { type: null, message: newProduct };
};

const updateProduct = async (id, productBody) => {
  const error = validateProductBody(productBody);
  if (error.type) return error;

  const { affectedRows } = await productsModel.update(id, productBody.name);
  if (!affectedRows) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: { id, ...productBody } };
};

const removeProduct = async (id) => {
  const { affectedRows } = await productsModel.remove(id);
  if (!affectedRows) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: '', message: '' };
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  createProduct,
  updateProduct,
  removeProduct,
};