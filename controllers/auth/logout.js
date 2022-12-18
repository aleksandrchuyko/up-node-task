const { User } = require("../../models/users/user");

const logout = async (req, res) => {
  const { _id, tokens, token } = req.user;
  const { all = "false" } = req.query;

  if (all === "true" || tokens.length >= 255) {
    await User.findByIdAndUpdate(_id, { tokens: [] });
  } else {
    console.log(token)
    const updatedTokens = tokens.filter((item) => {
      return item !== token;
    });
    await User.findByIdAndUpdate(_id, { tokens: [...updatedTokens] });
  }

  res.status(204).json({ message: "Logout success" });
};

module.exports = logout;
