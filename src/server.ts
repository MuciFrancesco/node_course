import app from "./app";
import "dotenv/config";
import config from "./config";
const port = config.PORT;

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

//port dopo aver installato npm install --save dotenv (che serve a far modificare la porta automaticamente al cambio del file .env) l'abbiamo spostata,cosi che ogni volta che vogliamo cambiarla
//potremmo farlo tranquillamente da .env e si modificherà automaticamente solo se  in package.json in script aggiungiamo a start:dev (comando creato da noi) --watch .env .
//fatto questo la porta si modificherà in automatico se cambiata

//per un aggiornamento della pagina ogni volta che avviene un cambiamento vai a package.json e in script scrivi "build-dev":"tsc --watch" ed eseguilo poi nel terminale
//questo ti permetterà in fase di sviluppo di modificare la pagina o le chiamate http senza dover fare sempre esci rientra nel server tutto in ts senza compilarlo in js
//poi sempre in packege.json metti in script "start":"node --enable-source-maps dist/EXPRESShttp/httpServer.js" per lo start normale
//e per farsì che anche esso si aggiorni automaticamente installa pacchetto con npm  install --save-dev nodemon  il pacchetto devemon
//poi crea sempre in script il comando "start:dev":"nodemon --watch dist/EXPRESShttp/" per startare l'applicazione in modalità dev e per far si che si aggiorni ogni volta che vede una modifica da parte della cartella dist
//poi installare con npm install --save-dev concurrently  il pacchetto concurrently che permette di eseguire 1,2 o più comandi da terminale nello stesso momento
//aggiungere sempre in package.json in script : "dev" : "npm run build && concurrently 'npm:build:dev' 'npm:start:dev' "  per permettere(grazie a concurrently) di effettuare questi 3 comandi visti prima insieme
