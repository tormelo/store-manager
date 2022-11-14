const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get(
  '/',
  salesController.getSales,
);

router.get(
  '/:id',
  salesController.getSaleById,
);

router.post(
  '/',
 salesController.registerSale,
);

router.delete(
  '/:id',
  salesController.removeSale,
);

module.exports = router;
