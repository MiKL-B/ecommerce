const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db.js");

const signup = async (request, response) => {
  const email = request.body.email;
  try {
    let sql = "SELECT * FROM person WHERE email = $1";
    const values = [email];
    const data = await pool.query(sql, values);
    const arr = data.rows;
    if (arr.length != 0) {
      return response.status(400).send("email deja existant");
    } else {
      bcrypt.hash(request.body.password, 10).then((hash) => {
        const values = [email, hash];
        const sql = "INSERT INTO person(email,password) VALUES($1,$2) ";

        pool.query(sql, values, (error, results) => {
          if (error) {
         //code ... console error
          } else if (!Array.isArray(results.row) || results.rows.length < 1) {
            throw error;
          }
        });
        response.status(201).send("user created");
      });
    }
  } catch (error) {
   
    response.status(500).json({
      error: "Database error while registring user!",
    });
  }
};
const login = async (request, response) => {
  const { email, password } = request.body;
  let sql = "SELECT * FROM person WHERE email = $1";
  try {
    //verify email
    const users = await pool.query(sql, [email]);
    if (users.rows.length === 0)
      return response.status(401).send("Email incorrect");
    //verify password
    await bcrypt
      .compare(password, users.rows[0].password)
      .then((valid) => {
        if (!valid) {
          return response.status(401).send("Mot de passe incorrect");
        }

        //JWT
        response.status(200).json({
          userId: users.rows[0].id_person,
          email: users.rows[0].email,
          role: users.rows[0].role,
          token: jwt.sign(
            {
              userId: users.rows[0].id_person,
              email: users.rows[0].email,
              role: users.rows[0].role,
            },

            process.env.TOKENSECRET,
            { expiresIn: "24h" }
          ),
        });
      })
      .catch((error) => response.status(500).json({ error }));
  } catch (error) {
    response.status(401).json({ error: error.message });
  }
};
//delete user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  let sql = "DELETE FROM person WHERE id_person = $1";
  pool.query(sql, [id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send("user deleted");
  });
};
module.exports = {
  signup,
  login,
  deleteUser,
};
