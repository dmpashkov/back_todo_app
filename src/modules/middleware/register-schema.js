const { check } = require('express-validator');

const isCheckValidator = [
  check('isCheck')
    .exists()
    .not()
    .isEmpty()
];
const textValidator = [
  check('text')
    .exists()
    .not()
    .isEmpty()
];

module.exports = {
  isCheckValidator,
  textValidator
};