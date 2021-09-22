export default {
  errors: {
    GENERIC: {
      message: 'Internal Error',
      code: 100,
      type: 'Genric Exception',
      status: 500,
    },
    ROUTE: {
      message: 'Route not found',
      code: 101,
      type: 'Routing Error',
      status: 500,
    },
    VALIDATION: {
      message: 'Invalid params',
      code: 102,
      type: 'Validation Error',
      status: 400,
    },
    UNAUTHORIZED: {
      message: 'Token is invalid. It might have expired.',
      code: 401,
      status: 401,
      type: 'Authorization Error',
    },
    USER_OPERATION_ACCESS_DENIED: {
      message: 'User with id {userId} is not allowed to {operation} image with id {imageId}.',
      code: 403,
      status: 403,
      type: 'Authorization Error',
    },
    IMAGE_DOES_NOT_EXIST: {
      message: 'Image with id {imageId} does not exist.',
      code: 103,
      status: 404,
      type: 'Not found Error',
    },
    ROW_NOT_DELETED: {
      message: 'Image with id {imageId} was not deleted.',
      code: 104,
      status: 500,
      type: 'Database Error',
    },

  },
};
