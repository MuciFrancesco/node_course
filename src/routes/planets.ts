import express, { Router } from "express";
import prisma from "../lib/prisma/client";
import {
    validate,
    planetSchema,
    PlanetData,
} from "../lib/middlewere/validation";

import { initMultermMiddleware } from "../lib/middlewere/multer";

const upload = initMultermMiddleware();
const router = Router();
router.get("/", async (request, response) => {
    const planets = await prisma.planet.findMany();
    response.json(planets);
});

router.get("/:id(\\d+)", async (request, response, next) => {
    //  \\d+ e un pattern specifico che indica che il numero può essere di uno o più caratteri(solo cifre(abbina solo le cifre))
    const planetId = Number(request.params.id);
    const planet = await prisma.planet.findUnique({
        where: { id: planetId }, //troviamo l'elemento planet dove l'id e uguale al parametro passato a planet id che e collegato a :id
    });

    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetId}`); //con next in questo caso possiamo passare un messaggio di errore
    }
    response.json(planet);
});

router.post(
    "/",
    validate({ body: planetSchema }),
    async (request, response) => {
        const PlanetData: PlanetData = request.body;
        const planet = await prisma.planet.create({
            data: PlanetData,
        });
        response.status(201).json(planet);
    }
);

router.put(
    "/:id(\\d+)",
    validate({ body: planetSchema }),
    async (request, response, next) => {
        const planetId = Number(request.params.id);
        const PlanetData: PlanetData = request.body;
        try {
            const planet = await prisma.planet.update({
                where: { id: planetId },
                data: PlanetData,
            });
            response.status(200).json(planet);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

router.delete("/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    try {
        await prisma.planet.delete({
            where: { id: planetId },
        });
        response.status(204).end();
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});

router.post(
    "/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {
        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded");
        }
        const planetId = Number(request.params.id); //request.params (i params sono in questo caso /planets/params) e .id quindi vuoldire (/planets/params/id)
        const photoFilename = request.file.filename;

        try {
            await prisma.planet.update({
                where: { id: planetId },

                data: { photoFilename },
            });
            response.status(201).json({ photoFilename }); //create new resorse true
        } catch (error) {
            response.status(404);
            next(`Cannot POST /planets/${planetId}/photo`);
        }
    }
);
router.use(`/photo/`, express.static("uploads"));

export default router;
