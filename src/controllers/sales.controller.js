const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const getSales = async (req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const registerSale = async (req, res) => {
  const saleBody = req.body;
  const { type, message } = await salesService.registerSale(saleBody);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const removeSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.removeSale(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).send();
};

module.exports = {
  getSales,
  getSaleById,
  registerSale,
  removeSale,
};