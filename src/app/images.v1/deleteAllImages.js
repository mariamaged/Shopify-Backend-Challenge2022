import { imagesService } from '../../services';
export default async function (req, res) {
    try {
        const { userId } = req;
        await imagesService.deleteImages(userId);
        return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
        throw error;
    }
}
