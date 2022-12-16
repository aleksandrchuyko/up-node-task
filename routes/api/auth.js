const express = require("express");

const router = express.Router();

const authController = require("../../controllers/auth");

const { validateReqBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/users/user");

const { controllersWrapper } = require("../../utils");

router.post(
  "/signup",
  validateReqBody(schemas.registerSchema),
  controllersWrapper(authController.signup)
);

router.post(
  "/signin",
  validateReqBody(schemas.loginSchema),
  controllersWrapper(authController.signin)
);

router.get("/info", authenticate, controllersWrapper(authController.info));

router.get("/logout", authenticate, controllersWrapper(authController.logout));

module.exports = router;
