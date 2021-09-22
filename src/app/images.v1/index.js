import { AsyncRouter } from 'express-async-router';
import { uploadFiles } from '../../server/middlewares';
import { postImagesValidation } from './validation';
import postImages from './postImages';

const router = new AsyncRouter();

router.post('/', postImagesValidation, uploadFiles, postImages);
// router.delete('/:imageId');
// router.delete('/');
// router.get('/', );
// router.get('/:imageId');
export default router;
