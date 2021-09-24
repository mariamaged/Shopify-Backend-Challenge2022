import { imagesService } from '../../services';
export default async function (req, res) {
    try {
        const { userId, params: { imageName } } = req;
        await imagesService.deleteImages(userId, [imageName]);
        return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
        throw error;
    }
}
