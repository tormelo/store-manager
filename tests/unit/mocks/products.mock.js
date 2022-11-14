const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];
const productCreateResponse = { id: 4, name: 'Machado do Thor Stormbreaker' };

const validProductBody = { name: 'Machado do Thor Stormbreaker' };
const validAltProductBody = { name: 'Martelo do Batman' };

const invalidProductBody = { name: 'Prod' };

const updateResponse = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
  undefined
];

const invalidUpdateResponse = [
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: 'Rows matched: 0  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  },
  undefined
];

const updatedProduct = {
  id: 1,
  name: 'Martelo do Batman'
};

module.exports = {
  allProductsResponse,
  productCreateResponse,
  updateResponse,
  invalidUpdateResponse,
  validProductBody,
  validAltProductBody,
  invalidProductBody,
  updatedProduct,
}