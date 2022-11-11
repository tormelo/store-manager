const connection = require('./connection');

const listAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

module.exports = { listAll };