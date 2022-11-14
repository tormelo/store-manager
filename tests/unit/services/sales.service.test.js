const { expect } = require('chai');
const sinon = require('sinon');

const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');

const {
  validSaleBody,
  invalidSaleBody,
  invalidQuantitySaleBody,
  saleInsertResponse,
  saleRegisterResponse,
} = require('../mocks/sales.mock');

describe('Testes de unidade do service sales', function () {
  afterEach(sinon.restore);

  describe('Cadastro de uma venda', async function () {
    it('deve retornar a venda em caso de sucesso', async function () {
      sinon.stub(salesModel, 'insert').resolves(saleInsertResponse);
      const { message } = await salesService.registerSale(validSaleBody);
      expect(message).to.be.deep.equal(saleRegisterResponse);
    });
    it('deve retornar erro se quantidade de items for inválida', async function () {
      const { type, message } = await salesService.registerSale(invalidQuantitySaleBody);
      expect(type).to.equal('INVALID_VALUE');
      expect(message).to.equal('"quantity" must be greater than or equal to 1');
    })
    it('deve retornar erro se passado id de produto inexistente', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const { type, message } = await salesService.registerSale(validSaleBody);
      expect(type).to.equal('PRODUCT_NOT_FOUND');
      expect(message).to.equal('Product not found');
    })
    it('deve retornar erro caso um campo obrigatório for omitido', async function () {
      const { type, message } = await salesService.registerSale(invalidSaleBody);
      expect(type).to.equal('REQUIRED_FIELD');
      expect(message).to.equal('"quantity" is required');
    })
  });
});
