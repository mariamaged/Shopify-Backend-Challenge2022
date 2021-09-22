const path = require("path");
const multer = require("multer");

const filename = (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
        return callback(message, null);
    }

    var name = `${Date.now()}-${file.originalname}`;
    callback(null, name);
};
const limits = { fieldSize: 100000000 };

var publicStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(`${__dirname}/../../upload/public`));
    },
    filename,
});

var privateStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(`${__dirname}/../../upload/private`));
    },
    filename,
});

var uploadFilesPublic = multer({
    storage: publicStorage, limits
}).array("files", 50);

var uploadFilesPrivate = multer({
    storage: privateStorage, limits
}).array("files", 50);

const uploadFiles = (req, res, next) => {
    const { body: { isPublic } } = req;
    if (config.nodeEnv === 'development') {
        if (isPublic) {
            return uploadFilesPublic(req, res, next);
        }
        else {
            return uploadFilesPrivate(req, res, next);
        }
    }
    else {
        return next();
    }
}
export default uploadFiles;
