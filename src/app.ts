import express, { response } from "express";
import prisma from "./lib/prisma/client";
import "express-async-errors";

const app = express();

app.use(express.json());

app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();
    response.json(planets);
});
app.post("/planets", async (request, response) => {
    const planet = request.body;
    response.status(201).json(planet);
});

export default app;
