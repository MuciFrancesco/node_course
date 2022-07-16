import multer from "multer";

jest.mock("./multer", () => {
    const originModule = jest.requireActual("./multer");
    return {
        __esModule: true,
        ...originModule,
        initMultermMiddleware: () => {
            return multer({
                storage: multer.memoryStorage(),
                ...originModule.multerOptions,
            });
        },
    };
});
