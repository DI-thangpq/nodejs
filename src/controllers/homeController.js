const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/CRUDService");

const User = require("../models/user");
const getHomePage = async (req, res) => {
  let results = await User.find({});
  return res.render("home.ejs", { listUsers: results });
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let userName = req.body.username;
  let password = req.body.password;
  let fullName = req.body.full_name;
  console.log("POST: ", email, userName, password, fullName);

  await User.create({
    email,
    userName,
    password,
    fullName,
  });
  res.send("Createed User successed");
};

const getCreatePage = async (req, res) => {
  res.render("create.ejs");
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId); // Gọi hàm getUserById với userId
    res.render("update.ejs", { user: user }); // Truyền thông tin user vào view
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const postUpdateUser = async (req, res) => {
  try {
    // Lấy thông tin từ request body
    let userId = req.body.userId; // Lấy ID người dùng để xác định bản ghi cần cập nhật
    let email = req.body.email;
    let userName = req.body.username;
    let fullName = req.body.full_name;

    console.log("POST UPDATE: ", userId, email, userName, fullName);

    // Thực hiện câu lệnh UPDATE
    const results = updateUserById(userName, email, fullName, userId);

    // Kiểm tra kết quả
    if (results.affectedRows === 0) {
      res.status(404).send("User not found or no changes made.");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("An error occurred while updating the user.");
  }
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;

  const results = await deleteUserById(userId);
  if (results) {
    res.status(404).send("User not found or no changes made.");
  } else {
    res.redirect("/");
  }
};
module.exports = {
  getHomePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
};
