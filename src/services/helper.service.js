import { imageRepository } from '../database/queries';

const { errors: { IMAGE_DOES_NOT_EXIST, USER_OPERATION_ACCESS_DENIED } } = config;

async function IsAuthorizedUser(userId, imageId) {
  try {
    const imageDetails = await imageRepository.getById(imageId);
    if (!imageDetails) {
      const { message } = IMAGE_DOES_NOT_EXIST;
      const modifiedMessage = message.replace('{imageId}', imageId);
      const updatedError = { ...IMAGE_DOES_NOT_EXIST, message: modifiedMessage };
      throw updatedError;
    }
    if (imageDetails.userId !== userId) {
      const { message } = USER_OPERATION_ACCESS_DENIED;
      const modifiedMessage = message.replace('{userId}', userId)
        .replace('{operation}', 'delete')
        .replace('{imageId}', imageId);
      const updatedError = { ...USER_OPERATION_ACCESS_DENIED, message: modifiedMessage};
      throw updatedError;
    }
  } catch (error) {
    throw error;
  }
}

export default {
  IsAuthorizedUser,
};
