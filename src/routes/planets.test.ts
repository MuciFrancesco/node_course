import { response } from "express";
import supertest from "supertest";
import app from "../app";
import { prismaMock } from "../lib/prisma/client.mock";
const jsonRequest = /application\/json/; //pattern specifico
const html = /text\/html/;
const request = supertest(app);
//get all paramether of a planet
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
            .expect("Content-Type", jsonRequest)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.body).toEqual(planets);
    });
});
//get a planet whith a id ..controll if id not exist
describe("GET /planets/:id", () => {
    test("Validat request", async () => {
        const planet = {
            id: 2,
            name: "Venere",
            description: null,
            diameter: 23213,
            moons: 12321,
            createdAt: "2022-07-10T15:45:22.226Z",
            updatedAt: "2022-07-10T15:45:04.923Z",
        };
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(planet); //findUnique restituisce un singolo dato
        const response = await request
            .get("/planets/1")
            .expect(200)
            .expect("Content-Type", jsonRequest);
        expect(response.body).toEqual(planet);
    });
    test("Invalid request-planet not exist", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null); //findUnique restituisce un singolo dato

        const response = await request
            .get("/planets/23")
            .expect(404)
            .expect("Content-Type", html);
        expect(response.text).toContain("Cannot GET /planets/23");
    });
    test("Invalid request-Invalid planet id", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null); //findUnique restituisce un singolo dato

        const response = await request
            .get("/planets/asda")
            .expect(404)
            .expect("Content-Type", html);
        expect(response.text).toContain("Cannot GET /planets/asda");
    });
});
//post a planet
describe("POST /planets", () => {
    test("Valid request ", async () => {
        const planet = {
            name: "Terra",
            description: "Terra..the greatest planet!!!",
            diameter: 234323,
            moons: 1233421,
        };

        //@ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(201)
            .expect("Content-Type", jsonRequest)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
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

describe("PUT /planets/:id", () => {
    test("Valid request ", async () => {
        const planet = {
            id: 4,
            name: "Terra",
            description: "Terra..the greatest planet!!!whoooaa!!!",
            diameter: 234323,
            moons: 1233421,
        };

        //@ts-ignore
        prismaMock.planet.update.mockResolvedValue(planet);

        const response = await request
            .put("/planets/4")
            .send({
                name: "Terra",
                description: "Terra..the greatest planet!!!whoooaa!!!",
                diameter: 234323,
                moons: 1233421,
            })
            .expect(200)
            .expect("Content-Type", jsonRequest)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.body).toEqual(planet);
    });
    test("Invalid request /planets", async () => {
        const planet = {
            diameter: 123213,
            moons: 123,
        };
        const response = await request
            .put("/planets/23")
            .send(planet)
            .expect(422);
        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
    test("Invalid request-planet not exist", async () => {
        //@ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("ERROR")); //findUnique restituisce un singolo dato

        const response = await request
            .put("/planets/23")
            .send({
                name: "Venere",
                description: "lovely planet",
                diameter: 23213,
                moons: 12321,
            })
            .expect(404)
            .expect("Content-Type", html);
        expect(response.text).toContain("Cannot PUT /planets/23");
    });
    test("Invalid request-Invalid planet id", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null); //findUnique restituisce un singolo dato

        const response = await request
            .put("/planets/asda")
            .expect(404)
            .expect("Content-Type", html);
        expect(response.text).toContain("Cannot PUT /planets/asda");
    });
});

describe("DELETE /planets/:id", () => {
    test("Validat request", async () => {
        const response = await request.delete("/planets/1").expect(204);
        expect(response.text).toEqual("");
    });
    test("Invalid request-planet not exist", async () => {
        //@ts-ignore
        prismaMock.planet.delete.mockRejectedValue(new Error("Error")); //findUnique restituisce un singolo dato

        const response = await request
            .delete("/planets/23")
            .expect(404)
            .expect("Content-Type", html)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        expect(response.text).toContain("Cannot DELETE /planets/23");
    });
    test("Invalid request-Invalid planet id", async () => {
        //@ts-ignore
        prismaMock.planet.findUnique.mockResolvedValue(null); //findUnique restituisce un singolo dato

        const response = await request
            .delete("/planets/asda")
            .expect(404)
            .expect("Content-Type", html);
        expect(response.text).toContain("Cannot DELETE /planets/asda");
    });
});

//questo test depend on : src/lib/middlewere/multer.mock.ts E usa multer.memoryStorage quindi nessun file viene scritto su disco.

describe("POST /planets/:id/photo", () => {
    test("Valid Request with JPG file upload", async () => {
        await request
            .post("/planets/10/photo")
            .attach("photo", "test-fixtures/photo/heart.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    });
    test("Valid Request with JPG file upload", async () => {
        await request
            .post("/planets/10/photo")
            .attach("photo", "test-fixtures/photo/heart.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");
    });
    test("Invalid Request with TXT file upload", async () => {
        const response = await request
            .post("/planets/10/photo")
            .attach("photo", "test-fixtures/photo/file.txt")
            .expect(500) //errore di multer 500 quando un type di un file non e corretto
            .expect("Content-Type", html);
        expect(response.text).toContain(
            "Error: The uploaded file must be a JPG or PNG extenction"
        );
    });

    test("Planet does not exist", async () => {
        // @ts-ignore
        prismaMock.planet.update.mockRejectedValue(new Error("error"));

        const response = await request
            .post("/planets/1/photo")
            .attach("photo", "test-fixtures/photo/heart.jpg")
            .expect(404)
            .expect("Content-Type", html);
        expect(response.text).toContain("Cannot POST /planets/1/photo");
    });

    test("Invalid planet ID", async () => {
        const response = await request
            .post("/planets/ads/photo")
            .expect(404)
            .expect("Content-Type", html);
        expect(response.text).toContain("Cannot POST /planets/ads/photo");
    });
    test("Invalid request with no file upload", async () => {
        const response = await request
            .post("/planets/23/photo")
            .expect(400) //client error (request send incorect) (NO PHOTO)
            .expect("Content-Type", html);
        expect(response.text).toContain("No photo file uploaded");
    });
});
