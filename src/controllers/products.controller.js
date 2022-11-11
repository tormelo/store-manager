const { productsService } = require('../services');

const listProducts = async (req, res) => {
  const { message } = await productsService.findAll();
  res.status(200).json(message);
};

module.exports = {
  listProducts,
};