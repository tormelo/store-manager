const { salesModel } = require('../models');
const { validateSaleBody, validateSaleUpdate } = require('./validations/inputValidations');

const findAll = async () => {
  const sales = await salesModel.findAll();

  return { type: null, message: sales };
};

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

const updateSale = async (saleId, saleBody) => {
  const error = await validateSaleUpdate(saleId, saleBody);
  if (error.type) return error;

  await Promise.all(saleBody.map(async (product) => {
    await salesModel.update(saleId, product);
  }));

  const updatedSale = {
    saleId,
    itemsUpdated: [
      ...saleBody,
    ],
  };
  return { type: null, message: updatedSale };
};

const removeSale = async (id) => {
  const { affectedRows } = await salesModel.remove(id);
  if (!affectedRows) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: '', message: '' };
};

module.exports = {
  findAll,
  findById,
  registerSale,
  updateSale,
  removeSale,
};