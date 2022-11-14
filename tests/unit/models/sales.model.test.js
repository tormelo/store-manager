const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { validSaleBody } = require('../mocks/sales.mock');

describe('Testes de unidade do model de sales', function () {
  afterEach(sinon.restore);

  it('Cadastrando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    sinon.stub(connection, 'query').resolves();
    const result = await salesModel.insert(validSaleBody);
    expect(result).to.be.deep.equal(4);
  });
});
