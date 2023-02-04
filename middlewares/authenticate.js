const jwt = require('jsonwebtoken');

const { RequestError } = require('../utils');

const { User } = require('../models/users/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const autHeader = req.headers.authorization;
    if (!autHeader) {
      throw RequestError(401);
    }
    const [bearer, token] = req.headers.authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw RequestError(401);
    }

    const payload = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(payload.id);

    if (!user) {
      throw RequestError(401);
    }
    if (
      !user.tokens.find((item) => {
        return item === token;
      })
    ) {
      throw RequestError(401);
    }
    req.user = user;
    req.user.token = token;

    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Unauthorized';
    }
    next(error);
  }
};

module.exports = authenticate;
