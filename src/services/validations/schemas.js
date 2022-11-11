const Joi = require('joi');

const productBodySchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  productBodySchema,
};
