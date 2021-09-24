import helperService from './helper.service';
import { imageRepository } from '../database/queries';

const { errors: { ROW_NOT_DELETED } } = config;

function postImages(images) {
  try {
    return imageRepository.add(images);
  } catch (error) {
    throw error;
  }
}

function getImages(userId, isPublic) {
  try {
    if (isPublic === 'true' || isPublic === true) {
      return imageRepository.getAll({ permission: 'public' });
    }
    else {
      return imageRepository.getAll({ permission: 'private', userId });
    }
  }
  catch (error) {
    throw error;
  }
}

async function deleteImages(userId, imagesId) {
  try {
    let deletedRows;
    if (imagesId && Array.isArray(imagesId)) {
      imagesId.forEach(async (imageId) => {
        await helperService.IsAuthorizedUser(userId, imageId);
      });
      imagesId.forEach(async (imageId) => {
        const deleted = await imageRepository.deleteById(imageId);
        if (deleted !== 1) {
          const { message } = ROW_NOT_DELETED;
          const modifiedMessage = message.replace('imageId', imageId);
          ROW_NOT_DELETED.message = modifiedMessage;
          throw ROW_NOT_DELETED;
        }
      });
      deletedRows = imagesId.length;
    } else {
      deletedRows = await imageRepository.deleteAll(userId);
    }
    return { deletedRows };
  } catch (error) {
    throw error;
  }
}
export default {
  postImages,
  getImages,
  deleteImages,
};
