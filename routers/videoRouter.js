import express from "express";
import routes from "../routes";
//컨트롤러의 함수를 객채로 변환하여 임포트해서 사용
import { 
    videos, 
    upload, 
    videoDetail, 
    editVideo, 
    deleteVideo
} from "../constrollers/videoController";

const videoRouter = express.Router(); 

//함수로 되어있던 부분을 controller에서 상수로 정의하여 불러와 사용
// videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail, videoDetail);

export default videoRouter;