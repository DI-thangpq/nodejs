const express = require("express");
const path = require("path");
require("dotenv").config();

const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

configViewEngine(app);

app.use("/", webRoutes);

connection.query("SELECT * from Users", function (error, results) {
  if (error) throw error;
  console.log("results", results);
});

app.listen(port, () => {
  console.log(`Connection port ${port}`);
});
