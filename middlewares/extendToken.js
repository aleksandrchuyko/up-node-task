const { User } = require("../models/users/user");
const { makeToken } = require("../utils");

const extendToken = async (req, res, next) => {
  const user = req.user;
    const token = makeToken(user._id);
    await User.findByIdAndUpdate(user._id, { $push: { tokens: token } });
  req.user.token = token;
  next();
};

module.exports = extendToken;
