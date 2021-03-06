import { body, query } from 'express-validator';
const {
    INVALID_STRING, EMPTY_ARRAY, INVALID_BOOLEAN_STRING, REQUIRED,
    INVALID_BOOLEAN,
} = config;
const postImagesValidation = [
    body('description')
        .isString()
        .withMessage(INVALID_STRING)
        .optional(),
    body('keywords')
        .if(body('keywords').isArray())
        .isLength({ min: 1 })
        .withMessage(EMPTY_ARRAY)
        .optional(),
    body('keywords')
        .if(body('keywords').not().isArray())
        .isString()
        .withMessage(INVALID_STRING)
        .customSanitizer((str) => { return str.split(',') })
        .optional(),
    body('isPublic')
        .isString()
        .withMessage(INVALID_STRING)
        .isIn(['true', 'false'])
        .withMessage(INVALID_BOOLEAN_STRING)
        .exists({ checkNull: true })
        .withMessage(REQUIRED),
];

const getImagesValidation = [
    query('isPublic')
        .isBoolean().withMessage(INVALID_BOOLEAN)
        .optional()
];

export { postImagesValidation, getImagesValidation };