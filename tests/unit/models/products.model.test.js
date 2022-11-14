const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { deleteResponse, updateResponse } = require('../mocks/generic.mock');
const {
  allProductsResponse,
  productCreateResponse,
  validProductBody
} = require('../mocks/products.mock');

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(allProductsResponse[0]);
  });

  it('Cadastrando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 4}]);
    const result = await productsModel.insert(validProductBody.name);
    expect(result).to.be.deep.equal(productCreateResponse);
  });

  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves(updateResponse);
    const result = await productsModel.update(1, 'Novo nome');
    expect(result).to.be.deep.equal(updateResponse[0]);
  });

  it('Deletando um produto', async function () {
    sinon.stub(connection, 'execute').resolves(deleteResponse);
    const result = await productsModel.remove(1);
    expect(result).to.be.deep.equal(deleteResponse[0]);
  });
});
