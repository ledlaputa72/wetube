import express from "express";
import routes from "../routes";
//컨트롤러의 함수를 객채로 변환하여 임포트해서 사용
import { 
    userDetail, 
    getEditProfile, 
    getChangePassword,
    postChangePassword,
    postEditProfile
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router(); 

//함수로 되어있던 부분을 controller에서 상수로 정의하여 불러와 사용
// userRouter.get(routes.users, users);
userRouter.get(routes.editProfile,onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword,onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword,onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;