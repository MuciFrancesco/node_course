import { doesNotMatch } from "assert";
import { triggerAsyncId } from "async_hooks";
import passport from "passport";
import passportGitHub2 from "passport-github2";

const githubStrategy = new passportGitHub2.Strategy(
    { clientID: "", clientSecret: "", callbackURL: "" },
    function (
        accesToken: string,
        refleshToken: string,
        profile: { [key: string]: string },
        done: (error: null, user: Express.User) => void
    ) {
        const user: Express.User = {
            //ts-ignore
            username: profile.username,
        };
        done(null, user);
    }
);

passport.use(githubStrategy);

passport.serializeUser<Express.User>((user, done) => done(null, user));

passport.deserializeUser<Express.User>((user, done) => done(null, user));

export { passport };
