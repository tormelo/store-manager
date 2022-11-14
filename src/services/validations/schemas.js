const Joi = require('joi');

const productBodySchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleBodySchema = Joi.array().items({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  productBodySchema,
  saleBodySchema,
};
