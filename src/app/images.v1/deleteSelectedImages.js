import { imagesService } from '../../services';
import path from 'path';
export default async function (req, res, next) {
    try {
        const { userId, body } = req;
        await imagesService.deleteImages(userId, body);
        if (config.nodeEnv == 'development') {
            req.files = body.map((imageName) =>
                ({ path: path.join(`${__dirname}/../../upload/` + imageName) }));
        }
        else {
            req.files = body.map((imageName) =>
                ({ filename: imageName }));
        }
        return next();
    } catch (error) {
        return next(error);
    }
}
