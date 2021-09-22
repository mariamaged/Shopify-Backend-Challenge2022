import jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';

const {
  authenticationDetails: {
    secret,
    tolerance,
  },
  errors: { UNAUTHORIZED },
} = config;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.firebase.projectId,
    clientEmail: config.firebase.clientEmail,
    privateKey: config.firebase.privateKey,
    apiKey: config.firebase.apiKey,
  }),
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

const getToken = async (req, res) => {
  try {
    const { email, password } = config.defaultCredentials;
    const authCredential = await admin.auth().signInWithEmailAndPassword(email, password);
    const { userId } = authCredential.user;
    console.log(`User is: ${userId}`);
    const token = jwt.sign(userId, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
    return res.status(HttpStatus.OK).send({ token });
  }
  catch (error) {
    throw error;
  }
};

export default {
  authenticate,
  getToken
};
