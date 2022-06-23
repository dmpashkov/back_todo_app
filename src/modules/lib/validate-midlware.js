const {check, validationResult} = require('express-validator');

const reqChecker = (req, res, next) => {
    check('text').exists().not().isEmpty()
    check('isCheck').exists().not().isEmpty()
    const error = validationResult(req);
    if (error.isEmpty()) {
        next();
    } else {
        res.status(400).send('Bad Request');
    }
}

module.exports = reqChecker;