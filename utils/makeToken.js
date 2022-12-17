const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const makeToken = (id) => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 600 });

  return token;
};

module.exports = makeToken;
