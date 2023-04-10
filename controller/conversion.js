const Helper = require('../helper');

class Conversion {
  static async toNumber(req, res, next) {
    try {
      const number = Helper.convertWordsToNumber(req.body.words);
      if (isNaN(number)) {
        res
          .status(422)
          .send(
            Helper.apiFailedResponse(
              'Invalid input: could not parse words to number',
              {},
              {},
            ),
          );
        return;
      }
      res.status(200).send(
        Helper.apiSuccessResponse('', {
          number,
        }),
      );
    } catch (err) {
      res.status(500).send(Helper.apiFailedResponse(err.message, {}, {}));
    }
  }

  static async toWords(req, res, next) {
    try {
      const word = Helper.convertNumberToWords(req.body.number);
      res.status(200).send(Helper.apiSuccessResponse('', { word }));
    } catch (err) {
      res.status(500).send(Helper.apiFailedResponse(err.message, {}, {}));
    }
  }
}
module.exports = Conversion;
