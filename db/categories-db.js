const sql = require("mssql/msnodesqlv8");

const sqlConfig = {
  database: "ToDoItems",
  server: ".\\sqlexpress",
  driver: "msnodesqlv8",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
  },
};
const getCategories = async () => {
  await sql.connect(sqlConfig);
  const { recordset } = await sql.query("SELECT * FROM Categories");
  return recordset;
};

const addCategory = async ({ name }) => {
  await sql.connect(sqlConfig);
  await sql.query`INSERT INTO Categories (Name) 
      VALUES (${name})`;
};


const updateCategory = async ({ name, id }) => {
  await sql.connect(sqlConfig);
  await sql.query`UPDATE Categories SET Name = ${name} WHERE Id = ${id}`;
};

const getCategoryName = async (id) => {
  await sql.connect(sqlConfig);
  const { recordset } = await sql.query(`SELECT * FROM Categories WHERE Id = ${id}`);
  return recordset;
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  getCategoryName,
};
