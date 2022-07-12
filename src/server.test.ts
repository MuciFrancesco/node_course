import { response } from "express";
import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";
const jsonRequest = /application\/json/; //pattern specifico per non specificarlo sempre
const request = supertest(app);
describe("GET /planets", () => {
    test("Validat request", async () => {
        const planets = [
            {
                id: 2,
                name: "Venere",
                description: null,
                diameter: 23213,
                moons: 12321,
                createdAt: "2022-07-10T15:45:22.226Z",
                updatedAt: "2022-07-10T15:45:04.923Z",
            },
            {
                id: 1,
                name: "Mercurio",
                description: "mercuty..the greatest planet!!!",
                diameter: 2323,
                moons: 12321,
                createdAt: "2022-07-01T00:00:00.000Z",
                updatedAt: "2022-07-10T15:58:14.679Z",
            },
        ];
        //@ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);
        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", jsonRequest);
        expect(response.body).toEqual(planets);
    });
});

describe("POST /planets", () => {
    test("Valid request /planets", async () => {
        const planet = {
            name: "mercurioo",
            diameter: 123213,
            moons: 123,
        };
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(201);
        expect(response.body).toEqual(planet);
    });
    test("Invalid request /planets", async () => {
        const planet = {
            diameter: 123213,
            moons: 123,
        };
        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422);
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
