import { body } from 'express-validator';
const postImagesValidation = [
    body('description').isString().optional(),
    body('keywords').isArray().custom((value) => {
        if (Array.isArray(value)) {
            const nonString = value.filter((v) => typeof (v) !== 'string');
            if (nonString.length !== 0) {
                return false;
            }
            return true;
        }
        return false;
    }),
    body('isPublic').isBoolean().exists(),
]

export { postImagesValidation };