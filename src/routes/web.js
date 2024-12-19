const express = require("express");
const {
  getHomePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", getHomePage);
router.get("/create", getCreatePage);
router.get("/update/:id", getUpdatePage);
router.post("/create-user", postCreateUser);
router.post("/update-user", postUpdateUser);
router.post("/delete/:id", postDeleteUser);

module.exports = router;
