export default {
  errors: {
    GENERIC: {
      message: 'Internal Error',
      code: 100,
      type: 'Genric Exception',
      status: 500
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
      status: 400
    },
  },
};
