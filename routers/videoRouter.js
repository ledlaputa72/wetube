import express from "express";
import routes from "../routes";
//컨트롤러의 함수를 객채로 변환하여 임포트해서 사용
import { 
    getUpload,
    postUpload,
    videoDetail,
    getEditVideo, 
    postEditVideo,
    deleteVideo,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router(); 


//함수로 되어있던 부분을 controller에서 상수로 정의하여 불러와 사용
//video upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
//video detail
videoRouter.get(routes.videoDetail(), videoDetail);
//video edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
//delete Video
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;