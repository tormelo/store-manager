const { salesModel } = require('../models');
const { validateSaleBody } = require('./validations/inputValidations');

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
  registerSale,
};