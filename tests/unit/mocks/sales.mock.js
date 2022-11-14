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

const saleByIdResponse = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

const allSalesResponse = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  },
];

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
  saleByIdResponse,
  allSalesResponse,
  saleInsertResponse,
  saleRegisterResponse,
}