const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];
const productCreateResponse = { id: 4, name: 'Machado do Thor Stormbreaker' };

const productCreateBody = { name: 'Machado do Thor Stormbreaker' };

module.exports = {
  allProductsResponse,
  productCreateResponse,
  productCreateBody,
}