const { productsModel } = require('../../models');
const { productBodySchema, saleBodySchema } = require('./schemas');

const validateProductBody = (productBody) => {
  const { error } = productBodySchema.validate(productBody);
  if (error) {
    const { message } = error;
    if (message.includes('required')) return { type: 'REQUIRED_FIELD', message };
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

const validateSalesData = (saleBody) => {
  const { error } = saleBodySchema.validate(saleBody);
  if (error) {
    let { message } = error;
    message = message.replace(/\[\d\]./, '');

    if (message.includes('required')) return { type: 'REQUIRED_FIELD', message };
    
    return { type: 'INVALID_VALUE', message };
  }
};

const validateSaleProducts = async (saleBody) => {
  let notFound = false;
  await Promise.all(saleBody.map(async ({ productId }) => {
    const product = await productsModel.findById(productId);
    if (!product) notFound = true;
  }));

  if (notFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const validateSaleBody = async (saleBody) => {
  const dataError = validateSalesData(saleBody);
  if (dataError) return dataError;

  const notFoundError = await validateSaleProducts(saleBody);
  if (notFoundError) return notFoundError;

  return { type: null, message: '' };
};

module.exports = {
  validateProductBody,
  validateSaleBody,
};
