import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/",
});

export const multerOptions = {};

export const initMultermMiddleware = () => {
    return multer({ storage, ...multerOptions });
};
