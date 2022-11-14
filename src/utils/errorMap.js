const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  REQUIRED_FIELD: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
