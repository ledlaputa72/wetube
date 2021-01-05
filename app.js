import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter"; 
import videoRouter from "./routers/videoRouter"; 
import globalRouter from "./routers/globalRouter"; 

//express를 실행한 결과를 app상수로 
const app = express();

//미들웨어 사용
app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(localsMiddleware);
app.use(function(req,res,next){
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next()
});

//해당 routes의 하위 카테고리의 전부를 사용한다  
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); 
app.use(routes.videos, videoRouter); 

export default app; 
