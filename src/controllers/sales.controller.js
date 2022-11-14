const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const registerSale = async (req, res) => {
  const saleBody = req.body;
  const { type, message } = await salesService.registerSale(saleBody);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  registerSale,
};