const connection = require("../config/database");
const getAllUsers = async () => {
  const [results, fields] = await connection.query(`select * from Users`);
  return results;
};

const getUserById = async (userId) => {
  const sql = "SELECT * FROM Users WHERE id = ?"; // Sử dụng placeholder
  const [results] = await connection.execute(sql, [userId]);
  let user = results && results.length > 0 ? results[0] : null;
  return user;
};

const updateUserById = async (userName, email, fullName, userId) => {
  const [results] = await connection.query(
    `UPDATE Users 
       SET username = ?, email = ?, full_name = ? 
       WHERE id = ?`,
    [userName, email, fullName, userId]
  );
};

const deleteUserById = async (userId) => {
  try {
    const [results] = await connection.execute(
      `DELETE FROM Users WHERE id = ?`,
      [userId]
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Ném lỗi để xử lý ở cấp cao hơn nếu cần
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
