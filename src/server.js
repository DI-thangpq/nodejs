const express = require("express");
const path = require("path");
require("dotenv").config();
var mysql = require("mysql2");

const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

configViewEngine(app);

app.use("/", webRoutes);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "thangit",
  port: 3307,
});

connection.query("SELECT * from Users", function (error, results, fields) {
  if (error) throw error;
  console.log("fields", fields);
  console.log("results", results);
});

app.listen(port, () => {
  console.log(`Connection port ${port}`);
});
