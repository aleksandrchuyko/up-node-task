const express = require('express');

const router = express.Router();

const latencyController = require('../../controllers/ping');

const { authenticate, extendToken } = require('../../middlewares');

const { controllersWrapper } = require('../../utils');

router.get(
  '/',
  authenticate,
  extendToken,
  controllersWrapper(latencyController.getLatency)
);


module.exports = router;