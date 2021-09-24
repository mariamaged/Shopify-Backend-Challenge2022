import { AsyncRouter } from 'express-async-router';
import { filesUploader, requestValidator } from '../../server/middlewares';
import { postImagesValidation, getImagesValidation } from './validation';
import postImages from './postImages';
import getImages from './getImages';
import deleteAllImages from './deleteAllImages';
const router = new AsyncRouter();

router.post('/',
    filesUploader.uploadFiles, filesUploader.renamePrivateImages,
    postImagesValidation, requestValidator, postImages);
router.get('/', getImagesValidation, requestValidator, getImages);
router.delete('/', deleteAllImages);
// router.delete('/:imageId');
// router.get('/:imageId');
export default router;
