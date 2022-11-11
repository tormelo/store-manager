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

const createProduct = async (productBody) => {
  const error = validateProductBody(productBody);
  if (error.type) return error;

  const newProduct = await productsModel.insert(productBody.name);
  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};