const bcrypt = require("bcryptjs");

const { User } = require("../../models/users/user");
const { RequestError, makeToken, validator } = require("../../utils");

const signup = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });
  if (user) {
    throw RequestError(409, "Email or phone in use");
  }
  const idType = validator(id);
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    id,
    password: hashPassword,
    id_type: idType,
  });
  const token = makeToken(result._id);
  await User.findByIdAndUpdate(result._id, { $push: { tokens: token } });
  res.status(201).json({
    token,
    user: {
      id: result.id,
    },
  });
};

module.exports = signup;
