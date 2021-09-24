import { AsyncRouter } from 'express-async-router';
import { filesUploader, requestValidator } from '../../server/middlewares';
import { postImagesValidation, getImagesValidation } from './validation';
import postImages from './postImages';
import getImages from './getImages';
import deleteAllImages from './deleteAllImages';
import deleteImage from './deleteImage';
import deleteSelectedImages from './deleteSelectedImages';
const router = new AsyncRouter();

const commonController = async (req, res) => {
    try {
        return res.status(HttpStatus.NO_CONTENT).send();
    }
    catch (error) {
        throw error;
    }
}
router.post('/',
    filesUploader.uploadFiles, filesUploader.renamePrivateImages,
    postImagesValidation, requestValidator, postImages);
router.get('/', getImagesValidation, requestValidator, getImages);
router.delete('/', filesUploader.getAllPrivateImages, filesUploader.deleteImages, deleteAllImages);
router.delete('/:imageName', deleteImage, filesUploader.deleteImages, commonController);
router.delete('/selected', deleteSelectedImages, filesUploader.deleteImages, commonController)
export default router;
