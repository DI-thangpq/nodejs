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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", webRoutes);

// connection();
// app.listen(port, () => {
//   console.log(`Connection port ${port}`);
// });
(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Connection port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error: ", error);
  }
})();
