const { convertNumberToWords, convertWordsToNumber } = require('../helper');

describe('convertNumberToWords', () => {
  test('converts positive integers to words', () => {
    expect(convertNumberToWords(0)).toEqual('zero');
    expect(convertNumberToWords(1)).toEqual('one');
    expect(convertNumberToWords(10)).toEqual('ten');
    expect(convertNumberToWords(25)).toEqual('twenty five');
    expect(convertNumberToWords(100)).toEqual('one hundred');
    expect(convertNumberToWords(123)).toEqual('one hundred and twenty three');
    expect(convertNumberToWords(1000)).toEqual('one thousand');
    expect(convertNumberToWords(4567)).toEqual(
      'four thousand five hundred and sixty seven',
    );
    expect(convertNumberToWords(123456789)).toEqual(
      'one hundred and twenty three million four hundred and fifty six thousand seven hundred and eighty nine',
    );
  });
});

describe('convertWordsToNumber', () => {
  test('converts positive integers to words', () => {
    expect(convertWordsToNumber('zero')).toEqual(0);
    expect(convertWordsToNumber('one')).toEqual(1);
    expect(convertWordsToNumber('ten')).toEqual(10);
    expect(convertWordsToNumber('twenty five')).toEqual(25);
    expect(convertWordsToNumber('one hundred')).toBe(100);
    expect(convertWordsToNumber('one hundred and twenty three')).toEqual(123);
    expect(convertWordsToNumber('one thousand')).toEqual(1000);
    expect(
      convertWordsToNumber('four thousand five hundred and sixty seven'),
    ).toEqual(4567);
    expect(
      convertWordsToNumber(
        'one hundred and twenty three million four hundred and fifty six thousand seven hundred and eighty nine',
      ),
    ).toEqual(123456789);
  });
});
