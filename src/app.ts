import express, { response } from "express";
import prisma from "./lib/prisma/client";
import "express-async-errors";
import cors from "cors";
import {
    validate,
    planetSchema,
    PlanetData,
    validationErrorMiddlewere,
} from "./lib/validation";
import { nextTick } from "process";
import { any } from "jest-mock-extended";

const corsOptions = {
    origin: "http://localhost:8080",
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions)); //famoso pacchetto per sistemare i problemi con i CORS

app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();
    response.json(planets);
});

app.get("/planets/:id(\\d+)", async (request, response, next) => {
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

app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const PlanetData: PlanetData = request.body;
        const planet = await prisma.planet.create({
            data: PlanetData,
        });
        response.status(201).json(planet);
    }
);

app.put(
    "/planets/:id(\\d+)",
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

app.delete("/planets/:id(\\d+)", async (request, response, next) => {
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

app.use(validationErrorMiddlewere);

export default app;
