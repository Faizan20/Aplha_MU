const express = require('express');
const router = express.Router();
const { conversion_controller } = require('../controller');
const { conversion_validator, checkValidation } = require('../validator');

router.post(
  '/to/number',
  conversion_validator('to-number'),
  checkValidation,
  conversion_controller.toNumber,
);

router.post(
  '/to/words',
  conversion_validator('to-words'),
  checkValidation,
  conversion_controller.toWords,
);

module.exports = router;
