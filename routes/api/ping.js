const express = require('express');
const cors = require('cors');

const router = express.Router();

const latencyController = require('../../controllers/ping');

const { authenticate, extendToken } = require('../../middlewares');

const { controllersWrapper } = require('../../utils');

router.get(
  '/',
  authenticate,
  extendToken,
  cors(),
  controllersWrapper(latencyController.getLatency)
);


module.exports = router;