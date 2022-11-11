const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];
const productCreateResponse = { id: 4, name: 'Machado do Thor Stormbreaker' };

const validProductBody = { name: 'Machado do Thor Stormbreaker' };

const invalidProductBody = { name: 'Prod' };

module.exports = {
  allProductsResponse,
  productCreateResponse,
  validProductBody,
  invalidProductBody,
}