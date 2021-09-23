import { body } from 'express-validator';
const postImagesValidation = [
    body('description')
        .isString()
        .optional(),
    body('keywords')
        .if(body('keywords').isArray())
        .isLength({ min: 1 })
        .if(body('keywords').not().isArray())
        .isString()
        .customSanitizer((str) => str.split(','))
        .optional(),
    body('isPublic')
        .isString()
        .isIn(['true', 'false'])
        .exists({ checkNull: true }),
]

export { postImagesValidation };