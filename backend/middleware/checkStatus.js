const { User } = require("../models");

const checkStatus = async (req, res, next) => {
  try {
    const userId = req.user.id; // Using camel case for consistency
    const user = await User.findOne({ where: { id: userId, supporter: false } });

    if (user) {
      const error = new Error("User must be a paid supporter");
      error.name = "MUST_PAID";
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkStatus;
