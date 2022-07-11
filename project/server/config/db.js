const Pool = require("pg").Pool;
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

module.exports = {
  async query(text, params) {
    const res = await pool.query(text, params);
    return res;
  },
};
