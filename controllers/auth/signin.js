const bcrypt = require("bcryptjs");

const { User } = require("../../models/users/user");
const { RequestError, makeToken } = require("../../utils");

const signin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });
  if (!user) {
    throw RequestError(401, "Email or phone is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Password is wrong");
  }
  const token = makeToken(user._id);
  await User.findByIdAndUpdate(user._id, { $push: { tokens: token } });
  res.status(200).json({
    token,
  });
};

module.exports = signin;
