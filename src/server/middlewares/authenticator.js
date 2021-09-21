import jwt from 'jsonwebtoken';

const {
  authenticationDetails: {
    secret,
    tolerance,
  },
  errors: { UNAUTHORIZED },
} = config;

const authenticate = async (req, res, next) => {
  try {
    const { headers: { authentication } } = req;
    const response = await jwt.verify(authentication, secret, { clockTolerance: tolerance });
    req.userId = response.sub;
    return next();
  } catch (error) {
    return next(UNAUTHORIZED);
  }
};

export default authenticate;
