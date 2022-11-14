const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const {
  allProductsResponse,
  invalidProductBody,
  validProductBody,
  productCreateResponse,
  validAltProductBody,
  updatedProduct
} = require('../mocks/products.mock');

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
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });
  });

  describe('Cadastrando um produto', async function () {
    it('deve retornar status 201 e produto em caso de sucesso', async function () {
      const req = { body: validProductBody };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'createProduct')
        .resolves({type: null, message: productCreateResponse});

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productCreateResponse);
    });

    it('deve retornar erro e status 422 caso nome for inválido', async function () {
      const req = { body: invalidProductBody };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Atualizando um produto', async function () {
    it('deve retornar o produto atualizado', async function () {
      const req = {
        body: validAltProductBody,
        params: { id: 1 },
      };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: null, message: updatedProduct });

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProduct);
    });
    it('deve retornar mensagem se produto não foi encontrado', async function () {
      const req = {
        body: validAltProductBody,
        params: { id: 100 },
      };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not Found' });

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not Found' });
    });
  });
});
