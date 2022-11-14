const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(`
  SELECT 
    s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
  FROM
      StoreManager.sales AS s
  INNER JOIN
      StoreManager.sales_products AS sp ON sp.sale_id = s.id
  ORDER BY sale_id, product_id`);

  return sales;
};

const findById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT 
    s.date, sp.product_id AS productId, sp.quantity
  FROM
      StoreManager.sales AS s
  INNER JOIN
      StoreManager.sales_products AS sp ON sp.sale_id = s.id
  WHERE
      sale_id = (?)
  ORDER BY sale_id, product_id`, [id]);

  return sale;
};

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

const remove = async (id) => {
  const [result] = await connection.execute(`
    DELETE FROM StoreManager.sales WHERE id = ?`,
    [id]);

  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
};