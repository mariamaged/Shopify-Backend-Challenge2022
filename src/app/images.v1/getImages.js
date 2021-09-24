import { imagesService } from '../../services';
export default async function (req, res) {
  try {
    const { userId, query: { isPublic = 'true'} } = req;
    const result = await imagesService.getImages(userId, isPublic);
    return res.status(HttpStatus.OK).send(result);
  } catch (error) {
    throw error;
  }
}
