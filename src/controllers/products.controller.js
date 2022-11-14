const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listProducts = async (req, res) => {
  const { message } = await productsService.findAll();
  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const productBody = req.body;
  const { type, message } = await productsService.createProduct(productBody);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productBody = req.body;
  const { type, message } = await productsService.updateProduct(id, productBody);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.removeProduct(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).send();
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
};