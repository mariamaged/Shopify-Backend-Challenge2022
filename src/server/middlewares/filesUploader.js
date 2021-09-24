import path from 'path';
import fs from 'fs';
import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-cloud-storage';
import { Storage } from '@google-cloud/storage';
const { gcs } = config;
const LINK_URL_BASE = `https://storage.googleapis.com/${gcs.bucket}/`;
const gcstorage = new Storage(gcs);

const deleteImages = (req) => {
    req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
            if (err) {
                console.log('Delete files error', err);
            }
            else {
                console.log(`Successfully deleted ${file.path}.`);
            }
        })
    });
}

const filename = (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
        const message = `${file.originalname} is invalid. Only accept png/jpeg.`;
        return callback(message, null);
    }
    const name = `${Date.now()}-${file.originalname}`;
    callback(null, name);
};

const limits = { fileSize: 100000000 };

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(`${__dirname}/../../upload`));
    },
    filename,
});

var uploadFilesLocal = multer({
    storage, limits
}).array('files', 50);

var uploadFilesGCS = multer({
    storage: new MulterGoogleCloudStorage({ ...gcs, filename }),
    limits,
}).array('files', 50);

const uploadFiles = (req, res, next) => {
    try {
        if (config.nodeEnv === 'development') {
            return uploadFilesLocal(req, res, next);
        }
        else {
            return uploadFilesGCS(req, res, next);
        }
    }
    catch (error) {
        //deleteImages(req);
        return next(error);
    }
}
const renamePrivateImages = async (req, res, next) => {
    try {
        if (req.body.isPublic === 'false') {
            if (config.nodeEnv === 'development') {
                req.files.forEach((file) => {
                    const folder = file.path.replace(file.filename, '');
                    const newFileName = req.userId + '-' + file.filename;
                    fs.rename(file.path, folder + newFileName, (err) => {
                        if (err) {
                            console.log('Rename files error', err);
                        }
                        else {
                            console.log(`Successfully rename file ${file.path} to ${req.userId}/${file.filename}.`);
                            file.path = folder + newFileName;
                            file.filename = newFileName;
                        }
                    });
                });
            }
            else {
                for (const file of req.files) {
                    const oldName = file.filename;
                    const newName = req.userId + '-' + oldName;
                    await gcstorage.bucket(gcs.bucket)
                        .file(oldName)
                        .rename(newName);
                    console.log(
                        `gs://${gcs.bucket}/${oldName} renamed to gs://${gcs.bucket}/${newName}.`
                    );
                    file.filename = newName;
                    file.linkUrl = LINK_URL_BASE + newName;
                }
            }
        }
        return next();
    }
    catch (error) {
        // deleteImages(req);
        return next(error);
    }
}


export default { uploadFiles, renamePrivateImages, deleteImages };
