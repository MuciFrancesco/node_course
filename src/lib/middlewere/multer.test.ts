import { generatePhotoFilename } from "./multer";

describe("", () => {
    test.each([
        ["image/png", "png"],
        ["image/jpeg", "jpeg"],
    ])(
        "Generates filename with corrent extension when passed mineType '%s' ",
        (mimeType, expectedFileExtenction) => {
            const fullFilename = generatePhotoFilename(mimeType);
            const [, fileExtension] = fullFilename.split(".");
            expect(fileExtension).toEqual(expectedFileExtenction);
        }
    );
});
