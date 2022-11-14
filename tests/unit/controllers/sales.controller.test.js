const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const {
  validSaleBody,
  saleRegisterResponse,
  invalidQuantitySaleBody,
  saleByIdResponse,
  allSalesResponse
} = require('../mocks/sales.mock');

describe('Testes de unidade do controller de sales', function () {
  afterEach(sinon.restore);

  describe('Buscando lista de vendas', async function () {
    it('deve retornar status 200 e lista de vendas', async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: null, message: allSalesResponse });

      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesResponse);
    });
  });

  describe('Buscando venda por id', async function () {
    it('deve retornar status 200 e informações da venda em caso de sucesso', async function () {
      const req = { params: { id: 1 } };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById')
        .resolves({ type: null, message: saleByIdResponse });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleByIdResponse);
    });
    it('deve retornar status 404 caso não exista a venda buscada', async function () {
      const req = { params: { id: 1 } };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('Cadastrando uma venda', async function () {
    it('deve retornar status 201 e informações da venda em caso de sucesso', async function () {
      const req = { body: validSaleBody };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: null, message: saleRegisterResponse });

      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleRegisterResponse);
    });

    it('deve retornar erro e status 422 em caso de quantidade inválida', async function () {
      const req = { body: invalidQuantitySaleBody };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  describe('Removendo uma venda', async function () {
    it('deve retornar status 204 em caso de sucesso', async function () {
      const req = { params: { id: 1 } };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon
        .stub(salesService, 'removeSale')
        .resolves({ type: '', message: '' });

      await salesController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
    it('deve retornar status 404 se não encontrar venda', async function () {
      const req = { params: { id: 1 } };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'removeSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});
