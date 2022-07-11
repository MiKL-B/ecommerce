const pool = require ('../config/db.js');

const getAllVolume = (request, response) => {
   let sql =
     'SELECT * from volume ';

  pool.query (sql, (error, results) => {
    if (error) {
      throw error;
    }
    response.status (200).json (results.rows);
  });
};
module.exports = {
  getAllVolume
  };
  