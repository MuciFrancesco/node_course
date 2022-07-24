import express from "express";
import "express-async-errors";
import { validationErrorMiddlewere } from "./lib/middlewere/validation";
import planetsRoutes from "./routes/planets";
import { initCorsMiddleware } from "./lib/middlewere/cors";
import { initSessionMiddleWare } from "./lib/middlewere/session";
import { passport } from "./lib/middlewere/passport";

const app = express();

app.use(initSessionMiddleWare());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoutes);

//con app.use ... express.static(uploads) gli stiamo dicendo vai alla cartella uploads e leggimi dopo aver passato
// localhost:5550/planets/photos  /nome del file salvato nel Database.  Lui ti mostrerà l'immagine

app.use(validationErrorMiddlewere);

export default app;
