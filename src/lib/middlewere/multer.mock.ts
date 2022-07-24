import multer from "multer";
//qui evitiamo che nella cartella upload quando viene eseguito multer(che serve a uplodare un nuovo file)
//ci siano anche i test fatti in server.test.ts
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
