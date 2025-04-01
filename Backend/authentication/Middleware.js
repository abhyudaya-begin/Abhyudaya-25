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
  console.log(req.user);
  if(!req.user){
    return res
    .status(403)
    .json(new ApiError(403, "Forbidden: Admin access!"));
  }
  console.log(req.user);
  const existAdmin = await Admin_model.find({phoneNumber: req.user.phoneNumber});

  if (!existAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Forbidden: Admin access required"));
  }
  next();
};

module.exports = { checkUser, checkAdmin };
