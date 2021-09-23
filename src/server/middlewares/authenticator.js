import jwt from 'jsonwebtoken';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { body } from 'express-validator';

const {
  authenticationDetails: {
    secret,
    tolerance,
  },
  errors: { UNAUTHORIZED, INVALID_PASSWORD },
} = config;

const app = initializeApp({
  projectId: config.firebase.projectId,
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  appId: config.firebase.appId,
});

const authenticate = async (req, res, next) => {
  try {
    const { headers: { authentication } } = req;
    const response = jwt.verify(authentication, secret, { clockTolerance: tolerance });
    req.userId = response.sub;
    return next();
  } catch (error) {
    return next(UNAUTHORIZED);
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
    const token = jwt.sign(uid, secret);
    return res.status(HttpStatus.OK).send({ token });
  }
  catch (error) {
    if(error.code === 'auth/user-not-found') {
      const authCredential = await createUserWithEmailAndPassword(getAuth(app), email, password);
      const { uid } = authCredential.user;
      const token = jwt.sign(uid, secret);
      return res.status(HttpStatus.OK).send({ token });
    }
    else if(error.code === 'auth/wrong-password') {
      return next(INVALID_PASSWORD);
    }
    return next(error);
  }
};

const credentialsValidation = [
  body('email').if(body('password').exists())
    .exists({ checkNull: true }).withMessage('Email missing even though password exists').isBoolean(),
  body('password').if(body('email').exists())
    .exists({ checkNull: true }).withMessage('Password missing even though email exists.')
];

export default {
  authenticate,
  getToken,
  credentialsValidation,
};
