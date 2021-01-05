import express from "express";
import routes from "../routes";
//컨트롤러의 함수를 객채로 변환하여 임포트해서 사용
import { 
    getJoin,
    postJoin,
    login, 
    logout 
} from "../constrollers/userController";
import { 
    home, 
    search 
} from "../constrollers/videoController";

const globalRouter = express.Router(); 

//함수로 되어있던 부분을 controller에서 상수로 정의하여 불러와 사용
globalRouter.get(routes.join, getJoin);
globalRouter.get(routes.join, postJoin);



globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
