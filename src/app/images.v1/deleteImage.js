import { imagesService } from '../../services';
import path from 'path';
export default async function (req, res, next) {
    try {
        const { userId, params: { imageName } } = req;
        await imagesService.deleteImages(userId, [imageName]);
        if (config.nodeEnv == 'development') {
            req.files = [{ path: path.join(`${__dirname}/../../upload/` + imageName) }];
        }
        else {
            req.files = [{ filename: imageName }];
        }
        return next();
    } catch (error) {
        return next(error);
    }
}
