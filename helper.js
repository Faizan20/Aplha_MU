const { validationResult } = require('express-validator');
const {
  wordToNumberMap,
  fractionMap,
  units,
  teens,
  tens,
} = require('./constants/conversion');

class Helper {
  static apiFailedResponse(message, data, error_messages, statusCode = 500) {
    return {
      response: false,
      status_code: statusCode,
      message: message,
      error_msgs: error_messages,
      data: data,
    };
  }

  static apiSuccessResponse(message, data, error_messages = []) {
    return data;
  }

  static checkValidation(req, res, next) {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      let validationErrors = [];
      errors
        .array({
          onlyFirstError: true,
        })
        .forEach((error, i) => {
          validationErrors[i] = error.msg;
        });
      res.status(422).send(
        Helper.apiFailedResponse(
          'Validation errors',
          errors.errors.map((e) => e.msg),
          errors.data,
          4,
        ),
      );
    } else {
      next();
    }
  }

  static convertWordsToNumber(words) {
    // Split words by spaces, remove conjunctions and punctuation
    const wordsArray = words
      .replace(/[-.]/g, ' ') // replace hyphens and dots with spaces
      .toLowerCase()
      .split(' ')
      .filter((word) => word !== 'and' && word !== 'a'); // remove conjunctions

    let number = 0;
    let fraction = 0;

    // Iterate over each word and update the number and fraction accordingly
    wordsArray.forEach((word) => {
      if (
        wordToNumberMap[word] !== undefined &&
        wordToNumberMap[word] !== 100 &&
        wordToNumberMap[word] !== 1000 &&
        wordToNumberMap[word] !== 1000000
      ) {
        number += wordToNumberMap[word];
      } else if (fractionMap[word] !== undefined) {
        fraction = fractionMap[word];
      } else if (
        word === 'hundred' ||
        word === 'thousand' ||
        word === 'million'
      ) {
        const multiplier = wordToNumberMap[word];
        number += (number % multiplier) * (multiplier - 1);
        number = (number / multiplier) * multiplier;
      }
    });

    // Return the final number as a float with up to 2 decimal places
    return parseFloat((number + fraction).toFixed(2));
  }

  static convertNumberToWords(num) {
    if (num === 0) {
      return 'zero';
    }

    if (num < 0) {
      return 'minus ' + Helper.convertNumberToWords(Math.abs(num));
    }

    let words = '';

    if (num >= 1000000) {
      words +=
        Helper.convertNumberToWords(Math.floor(num / 1000000)) + ' million ';
      num %= 1000000;
    }

    if (num >= 1000) {
      words +=
        Helper.convertNumberToWords(Math.floor(num / 1000)) + ' thousand ';
      num %= 1000;
    }

    if (num >= 100) {
      words += Helper.convertNumberToWords(Math.floor(num / 100)) + ' hundred ';
      num %= 100;
    }

    if (num > 0) {
      if (words !== '') {
        words += 'and ';
      }

      if (num <= 10) {
        words += units[num];
      } else if (num < 20) {
        words += teens[num - 10];
      } else {
        words += tens[Math.floor(num / 10)];
        if (num % 10 !== 0) {
          words += ' ' + units[num % 10];
        }
      }
    }

    return words.trim();
  }
}

module.exports = Helper;
