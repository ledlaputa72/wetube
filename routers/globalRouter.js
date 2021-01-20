import express from "express";
import passport from "passport";
import routes from "../routes";
//컨트롤러의 함수를 객채로 변환하여 임포트해서 사용
import { 
    home, 
    search 
} from "../controllers/videoController";
import { 
    getJoin,
    getLogin, 
    logout, 
    postJoin,
    postLogin,
    githubLogin,
    postGithubLogin,
    facebookLogin,
    postFacebookLogin,
    getMe
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router(); 

//함수로 되어있던 부분을 controller에서 상수로 정의하여 불러와 사용
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureRedirect: '/login' }), postGithubLogin);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, passport.authenticate('facebook', { failureRedirect: '/login' }), postFacebookLogin);

export default globalRouter;
