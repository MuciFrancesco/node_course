import multer from "multer";
import mime from "mime";
import { v4 as uuidv4 } from "uuid"; //non funzionava ramdomUUID stranamente,installato un altro generatore di ID

import { request } from "http";
//grazie a multer possiamo configurare il nostro progetto in modo che i file vengano salvati su disco
export const generatePhotoFilename = (mineType: string) => {
    const randomFilename = `${uuidv4()}-${Date.now()}`; //generiamo un random ID e una data di quando e stato salvato il file
    const fileExtension = mime.getExtension(mineType);
    const fileName = `${randomFilename}.${fileExtension}`;
    return fileName;
};
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callBack) => {
        return callBack(null, generatePhotoFilename(file.mimetype));
    },
});

const MAX_SIZE_MEGABYTES = 6 * 1024 * 1024; //Calcola in bytes quanto deve essere grande al massimo il file ...6 mb in questo caso
const VALID_MIME_TYPES = ["image/png", "image/jpeg"];
const fileFilter: multer.Options["fileFilter"] = (request, file, callBack) => {
    if (VALID_MIME_TYPES.includes(file.mimetype)) {
        callBack(null, true);
    } else {
        callBack(
            new Error(
                "Error: The uploaded file must be a JPG or PNG extenction"
            )
        );
    }
};

export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_MEGABYTES, //passiamo il max-size-megabite
    },
};

export const initMultermMiddleware = () => {
    return multer({ storage, ...multerOptions });
};
