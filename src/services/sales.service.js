const { salesModel } = require('../models');
const { validateSaleBody } = require('./validations/inputValidations');

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const registerSale = async (saleBody) => {
  const error = await validateSaleBody(saleBody);
  if (error.type) return error;

  const id = await salesModel.insert(saleBody);
  const newSale = {
    id,
    itemsSold: [
      ...saleBody,
    ],
  };
  return { type: null, message: newSale };
};

module.exports = {
  findById,
  registerSale,
};