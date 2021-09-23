import jwt from 'jsonwebtoken';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { body } from 'express-validator';

const {
  authenticationDetails: {
    secret,
    tolerance,
  },
  errors: { UNAUTHORIZED, UNAUTHORIZED_TOKEN_NOT_FOUND, INVALID_PASSWORD },
} = config;

const app = initializeApp({
  projectId: config.firebase.projectId,
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  appId: config.firebase.appId,
});

const authenticate = async (req, res, next) => {
  try {
    let { headers: { authorization } } = req;
    if (!authorization || authorization.split(' ').length < 2) {
      return next(UNAUTHORIZED_TOKEN_NOT_FOUND);
    }
    authorization = authorization.split(' ')[1];
    const response = jwt.verify(authorization, secret, { clockTolerance: tolerance });
    req.userId = response;
    return next();
  } catch (error) {
    if (error.message === 'jwt malformed' || error.message === 'invalid signature') {
      return next(UNAUTHORIZED);
    }
    return next(error);
  }
};

const getToken = async (req, res, next) => {
  const {
    body: {
      email = config.defaultCredentials.email,
      password = config.defaultCredentials.password
    }
  } = req;
  try {
    const authCredential = await signInWithEmailAndPassword(getAuth(app), email, password);
    const { uid } = authCredential.user;
    const token = jwt.sign({ userId: uid }, secret);
    return res.status(HttpStatus.OK).send({ token });
  }
  catch (error) {
    if (error.code === 'auth/user-not-found') {
      const authCredential = await createUserWithEmailAndPassword(getAuth(app), email, password);
      const { uid } = authCredential.user;
      const token = jwt.sign({ userId: uid }, secret);
      return res.status(HttpStatus.OK).send({ token });
    }
    else if (error.code === 'auth/wrong-password') {
      return next(INVALID_PASSWORD);
    }
    return next(error);
  }
};

const credentialsValidation = [
  body('email').if(body('password').exists())
    .exists({ checkNull: true }).withMessage('Email missing even though password exists'),
  body('password').if(body('email').exists())
    .exists({ checkNull: true }).withMessage('Password missing even though email exists.')
];

export default {
  authenticate,
  getToken,
  credentialsValidation,
};
