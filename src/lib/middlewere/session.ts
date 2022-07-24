//session si occuperà di salvare temporaneamente i dati dello user  che sta accedendo grazie per esempio al passport di gitHub dal file passport.ts
import session from "express-session";
import config from "../../config";
export function initSessionMiddleWare() {
    return session({
        secret: config.SESSION_SECRET, //ricavato grazie a un console.log nell terminale di : node -e "console.log(crypto.randomBytes(32).toString('hex'))"
        resave: false,
        saveUninitialized: false,
    });
}

//questo funzione fa in modo che quando creaiamo una nuova sessione al login dell'utente se e gia registrato ritornerà dai cookie i suoi dati

//quindi controllerà l'API e ritornerà il session id
