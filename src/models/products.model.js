const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const findByQuery = async (query) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [`%${query}%`],
  );
  return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  
  return {
    id: insertId,
    name,
  };
};

const update = async (id, name) => {
  const [result] = await connection.execute(`
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [name, id]);

  return result;
};

const remove = async (id) => {
  const [result] = await connection.execute(`
    DELETE FROM StoreManager.products WHERE id = ?`,
    [id]);

  return result;
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  insert,
  update,
  remove,
};