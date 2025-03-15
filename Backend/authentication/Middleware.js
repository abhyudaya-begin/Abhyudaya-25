const { ApiError } = require("../utils/ApiError");
const { Admin_model } = require("../Admin/Admin_Model");

// Middleware to check if user exists in req.user
const checkUser = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized: User not logged in"));
  }

  next();
};

// Middleware to check if user is an admin
const checkAdmin = async (req, res, next) => {
  const existAdmin = await Admin_model.find(req.user);
  if (!existAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Forbidden: Admin access required"));
  }
  next();
};

module.exports = { checkUser, checkAdmin };
