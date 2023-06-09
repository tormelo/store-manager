const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { deleteResponse, insertResponse, updateResponse } = require('../mocks/generic.mock');
const { validSaleBody, saleByIdResponse, allSalesResponse, updatedSaleBody } = require('../mocks/sales.mock');

describe('Testes de unidade do model de sales', function () {
  afterEach(sinon.restore);

  it('Buscando lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesResponse]);
    const result = await salesModel.findAll();
    expect(result).to.be.deep.equal(allSalesResponse);
  });

  it('Buscando uma venda por id', async function () {
    sinon.stub(connection, 'execute').resolves([saleByIdResponse]);
    const result = await salesModel.findById(1);
    expect(result).to.be.deep.equal(saleByIdResponse);
  });

  it('Cadastrando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    sinon.stub(connection, 'query').resolves();
    const result = await salesModel.insert(validSaleBody);
    expect(result).to.be.deep.equal(4);
  });

  it('Atualizando um item de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves(updateResponse);
    const { affectedRows } = await salesModel.update(1, updatedSaleBody[0]);
    expect(affectedRows).to.equal(1);
  });

  it('Deletando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves(deleteResponse);
    const result = await salesModel.remove(1);
    expect(result).to.be.deep.equal(deleteResponse[0]);
  });
});
