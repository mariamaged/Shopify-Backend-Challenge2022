import { imagesService } from '../../services';
export default async function (req, res) {
    try {
        const { userId } = req;
        const deletedRows = await imagesService.deleteImages(userId);
        return res.status(HttpStatus.OK).send({ deletedRows });
    } catch (error) {
        throw error;
    }
}
