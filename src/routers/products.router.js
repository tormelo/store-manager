const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get(
  '/search',
  productsController.getProductsByQuery,
);

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProduct,
);

router.post(
  '/',
  productsController.createProduct,
);

router.put(
  '/:id',
  productsController.updateProduct,
);

router.delete(
  '/:id',
  productsController.removeProduct,
);

module.exports = router;
