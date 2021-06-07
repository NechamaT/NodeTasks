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

const getIncompleteTasks = async () => {
  await sql.connect(sqlConfig);
  const { recordset } = await sql.query(
    "SELECT tdi.*, c.Name as CategoryName FROM categories c JOIN ToDoItems tdi ON c.Id = tdi.CategoryId WHERE tdi.CompletedDate is null"
  );
  return recordset;
};

const getCompletedTasks = async () => {
  await sql.connect(sqlConfig);
  const { recordset } = await sql.query(
    "SELECT tdi.*, c.Name as CategoryName FROM categories c JOIN ToDoItems tdi ON c.Id = tdi.CategoryId WHERE tdi.CompletedDate is not null"
  );
  return recordset;
};

const getByCategoryId = async id => {
  await sql.connect(sqlConfig);
  const { recordset } = await sql.query`SELECT td.*, c.Name FROM Categories c JOIN ToDoItems td ON c.Id = td.CategoryId WHERE td.CategoryId = ${id}`;
  return recordset;
}
const addTask = async ({ title, dueDate, categoryId }) => {
  await sql.connect(sqlConfig);
  await sql.query`INSERT INTO ToDoItems (Title, DueDate, CategoryId) 
    VALUES (${title}, ${dueDate}, ${categoryId}) `;
};
const markTaskCompleted = async ({ id }) => {
  await sql.connect(sqlConfig);
  await sql.query`UPDATE ToDoItems SET CompletedDate = GETDATE() WHERE Id = ${id}`;
}

module.exports = {
  
  addTask,
  getCompletedTasks,
  getIncompleteTasks,
  markTaskCompleted,
  getByCategoryId
};
