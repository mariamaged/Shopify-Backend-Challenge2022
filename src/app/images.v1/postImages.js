import { imagesService } from '../../services';
import { ImageModel } from './models';
export default async function (req, res) {
  try {
    const { userId, files, body: { description, keywords, isPublic } } = req;
    const images = files.map((file) => new ImageModel(
      { ...file, description, keywords, isPublic, userId }
    ));
    const result = await imagesService.postImages(images);
    return res.status(HttpStatus.CREATED).send(result);
  } catch (error) {
    throw error;
  }
}
