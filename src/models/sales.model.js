const connection = require('./connection');

const insert = async (products) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES()',
  );

  const values = products.map(({ productId, quantity }) => [insertId, productId, quantity]);

  await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?',
    [values],
  );

  return insertId;
};

module.exports = {
  insert,
};