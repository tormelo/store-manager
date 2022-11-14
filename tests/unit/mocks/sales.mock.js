const validSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const invalidQuantitySaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 0 },
];

const invalidSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2 },
]

const saleInsertResponse = 3;

const saleRegisterResponse = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = {
  validSaleBody,
  invalidSaleBody,
  invalidQuantitySaleBody,
  saleInsertResponse,
  saleRegisterResponse,
}