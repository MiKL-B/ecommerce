const pool = require("../config/db.js");

const getAllCategory = (request, response) => {
 
  let sql = "SELECT * from category";
  pool.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createCategory = async (request, response) => {
  //code ...
  const { category } = request.body;
  let sql = "INSERT INTO category(label_category) VALUES($1)";
  await pool.query(sql, [category], (error, results) => {
    if (error) {
      throw error;
    } else if (!Array.isArray(results.row) || results.rows.length < 1) {
      throw error;
    }
  });
  response.status(201).send("category created");
};
const updateCategory = (request, response) => {
  //code ...
  const id = parseInt(request.params.id);
  const { category } = request.body;
  let sql = "UPDATE category SET label_category = $1 WHERE id_category = $2";
  pool.query(sql, [category, id], (error, results) => {
    if (error) {
      throw error;
    } else if (!Array.isArray(results.row) || results.rows.length < 1) {
      throw error;
    }
  });
  response.status(201).send("category updated");
};
const deleteCategory = (request, response) => {
  //code ...
  const id = parseInt(request.params.id);
  let sql = "DELETE FROM category WHERE id_category = $1";
  pool.query(sql, [id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send("category deleted");
  });
};
module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
