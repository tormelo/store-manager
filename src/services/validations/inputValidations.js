const { productsModel } = require('../../models');
const { productBodySchema, saleBodySchema } = require('./schemas');

const validateProductBody = (productBody) => {
  const { error } = productBodySchema.validate(productBody);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateSaleBody = async (saleBody) => {
  const { error } = saleBodySchema.validate(saleBody);
  if (error) return { type: 'INVALID_VALUE', message: error.message.replace(/\[\d\]./, '') };
  
  let notFound = false;
  await Promise.all(saleBody.map(async ({ productId }) => {
    const product = await productsModel.findById(productId);
    if (!product) notFound = true;
  }));
  
  if (notFound) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateProductBody,
  validateSaleBody,
};
