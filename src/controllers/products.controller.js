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

module.exports = {
  listProducts,
  getProduct,
};