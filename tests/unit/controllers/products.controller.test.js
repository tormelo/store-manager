const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { allProductsResponse } = require('../mocks/products.mock');

describe('Testes de unidade do controller de produtos', function () {
  afterEach(sinon.restore);

  describe('Buscando todos produtos', async function () {
    it('deve retornar lista de produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: allProductsResponse });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });
  });

  describe('Buscando um produto por id', async function () {
    it('deve retornar status 200 e produto caso exista', async function () {
      const req = {
        params: { id: 1 },
      };
  
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: allProductsResponse[0] });
  
      await productsController.getProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    });

    it('deve retornar status 404 e mensagem de erro caso não exista', async function () {
      const req = {
        params: { id: 4 },
      };
  
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  
      await productsController.getProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('Product not found');
    });
  });
});
