const pool = require("../config/db.js");

const getAllProduct = (request, response) => {
  let sql =
    "SELECT * from product";

  pool.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProductById = (request, response) => {
  const slug = request.params.slug;
  const value = [slug];

  let sql =
    "SELECT * FROM product INNER JOIN category on product.id_category = category.id_category INNER JOIN volume on product.id_volume = volume.id_volume  WHERE slug = " +
    `'${value}'`;

  pool.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createProduct = async (request, response) => {
  const { name, image, category, price, volume, description, composition } =
    request.body;
  let slug =
    name
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/  +/g, " ")
      .replace(/\s/g, "-")
      .toLowerCase() + Date.now();
  try {
    let sql = "SELECT * FROM product WHERE slug = $1";
    const values = [name];
    const data = await pool.query(sql, values);
    const arr = data.rows;
    if (arr.length != 0) {
      //code ...
      return response.status(400).send("deja existant");
    } else {
      //code ...
      let date = new Date();

      let sql =
        "INSERT INTO product(name,image,createdAt,id_category,price,slug,id_volume,description,composition) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";

      await pool.query(
        sql,
        [
          name,
          image,
          date,
          category,
          price,
          slug,
          volume,
          description,
          composition,
        ],
        (error, results) => {
          if (error) {
            throw error;
          } else if (!Array.isArray(results.row) || results.rows.length < 1) {
            throw error;
          }
        }
      );
      response.status(201).send("product created");
    }
  } catch (error) {
    //code error
  }
};

const updateProduct = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, price, category, image, volume, description, composition } =
    request.body;

  let slug =
    name
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/  +/g, " ")
      .replace(/\s/g, "-")
      .toLowerCase() + Date.now();

  //code ...
  let sql =
    "UPDATE product SET name = $1, price = $2, id_category = $3, image = $4, slug = $5 ,id_volume = $6, description = $7, composition = $8 WHERE id_product = $9";
  pool.query(
    sql,
    [name, price, category, image, slug, volume, description, composition, id],
    (error, results) => {
      if (error) {
        throw error;
      } else if (!Array.isArray(results.row) || results.rows.length < 1) {
        throw error;
      }
    }
  );
  response.status(201).send("product updated");
};

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id);
  let sql = "DELETE FROM product WHERE id_product = $1";
  pool.query(sql, [id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send("product deleted");
  });
};
module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
