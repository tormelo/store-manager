const { expect } = require('chai');
const sinon = require('sinon');

const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const {
  allProductsResponse,
  productCreateResponse,
  validProductBody,
  invalidProductBody
} = require('../mocks/products.mock');

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

  describe('Cadastro de um produto', async function () {
    it('deve retornar o produto em caso de sucesso', async function () {
      sinon.stub(productsModel, 'insert').resolves(productCreateResponse);
      const { message } = await productsService.createProduct(validProductBody);
      expect(message).to.be.deep.equal(productCreateResponse);
    });
    it('deve retornar erro se nome for inválido', async function () {
      const { type, message } = await productsService.createProduct(invalidProductBody);
      expect(type).to.equal('INVALID_VALUE');
      expect(message).to.equal('"name" length must be at least 5 characters long');
    })
    it('deve retornar erro não possuir campo nome', async function () {
      const { type, message } = await productsService.createProduct({});
      expect(type).to.equal('REQUIRED_FIELD');
      expect(message).to.equal('"name" is required');
    })
  });
});
