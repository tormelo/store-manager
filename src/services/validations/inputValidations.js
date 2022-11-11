const { productBodySchema } = require('./schemas');

const validateProductBody = (productBody) => {
  const { error } = productBodySchema.validate(productBody);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateProductBody,
};
