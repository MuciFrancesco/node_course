import express, { response } from "express";
import prisma from "./lib/prisma/client";
import "express-async-errors";
import {
    validate,
    planetSchema,
    PlanetData,
    validationErrorMiddlewere,
} from "./lib/validation";

const app = express();

app.use(express.json());

app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();
    response.json(planets);
});
app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planet: PlanetData = request.body;
        response.status(201).json(planet);
    }
);

app.use(validationErrorMiddlewere);

export default app;
