const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { allProductsResponse } = require('../mocks/products.mock');

describe('Testes de unidade do service de produtos', function () {
  afterEach(sinon.restore);

  describe('Listagem de produtos', function () {
    it('deve retornar a lista de produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProductsResponse);
      const result = await productsService.findAll();
      expect(result.message).to.be.deep.equal(allProductsResponse);
    });
  });

  describe('Busca de produto a partir do seu id', function () {
    it('deve retornar o produto caso id exista', async function () {
      sinon.stub(productsModel, 'findById').resolves(allProductsResponse[0]);
      const result = await productsService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(allProductsResponse[0]);
    });
    it('deve retornar um erro caso não exista produto com id especificado', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const result = await productsService.findById(4);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
});
