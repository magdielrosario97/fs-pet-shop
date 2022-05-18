const Pool = require("pg").Pool;

const pool = new Pool({
   user: "Magdiel",
   host: "localhost",
   database: "petshop",
   password: "2782",
   port: 5432,
});

module.exports = pool;
