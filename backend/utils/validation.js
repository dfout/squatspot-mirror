const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) =>{
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()){
        const errors = {};

        validationErrors
            .array()
            .forEach(error=> errors[error.path] = error.msg);

        const err = new Error('Bad Request');
        err.errors = errors;
        err.status = 400;
        err.message = 'Bad request.'
        err.title = 'Bad request'
        next(err)
    }
    next()
};

module.exports = {
    handleValidationErrors
}
