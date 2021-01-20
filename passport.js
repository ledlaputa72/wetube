import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";
import routes from './routes';

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
    }, githubLoginCallback)
);

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `https://73c77a76d1cb.ngrok.io${routes.facebookCallback}`, //해당 주소에 https:// 주소를 넣어야 한다. 
    profileFields: ['id','displayName','photos','email'],
    scope:['public_profile', 'email']
    }, facebookLoginCallback)
);

/* passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */
passport.serializeUser((user,done) => {done(null,user);});
passport.deserializeUser((user,done) => {done(null,user);});