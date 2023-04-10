const { body, check } = require('express-validator');

module.exports = {
  validate(method) {
    let validations = [];
    switch (method) {
      case 'to-number':
        validations = [
          body('words').notEmpty().withMessage('Words cannot be empty.'),
        ];
        break;
      case 'to-words':
        validations = [
          check('number')
            .exists()
            .isNumeric()
            .withMessage('Invalid number')
            .toFloat(),
        ];
        break;
      default:
        validations = [];
    }

    return validations;
  },
};
