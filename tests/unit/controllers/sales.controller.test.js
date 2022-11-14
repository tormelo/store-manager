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
  invalidQuantitySaleBody
} = require('../mocks/sales.mock');

describe('Testes de unidade do controller de sales', function () {
  afterEach(sinon.restore);

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
});
