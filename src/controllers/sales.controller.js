const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

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

module.exports = {
  getSaleById,
  registerSale,
};