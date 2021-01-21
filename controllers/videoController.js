import Video from "../models/Video";
import routes from "../routes";

//메인 홈 화면 컨트롤
export const home = async(req,res) => {
    try{
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home", {pageTitle: "Home", videos });    
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: [] });    
    }    
};

//비디오 서치 컨트롤
export const search = async(req,res) =>  {
    // const searchingBy = req.query.term;
    const {
        query: {term: searchingBy}
    } = req;
    let videos = [];
    try {
        videos = await Video.find({title: {$regex: searchingBy, $options: "i"}});
    } catch (error) {
        console.log(error)    ;
    }
    res.render("Search", {pageTitle:"search", searchingBy, videos});    
};

//비디오 업로드 
//업로드 get
export const getUpload = (req,res) => {
    res.render("upload", {pageTitle:"Upload"});
}
//업로드 post
export const postUpload = async (req,res) =>  {
    const {
        body: {title, description},
        file: { path}    
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    });    
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
}

//비디오 디테일
export const videoDetail = async (req,res) =>  {
    const {
        params: {id}
    } = req;    
    try{
        const video = await Video.findById(id).populate('creator');    
        res.render("videoDetail", {pageTitle:"Video Detail", video});
    } catch(error) {
        // console.log(error);
        res.redirect(routes.home);
    }    
}

//비디오 수정 
//수정 get
export const getEditVideo = async (req,res) =>  {
    const {
        params: {id}
    } = req;
    try {
        // res.render("editVideo", {pageTitle:`Edit ${video.title}`, video});
        const video = await Video.findById(id);                
        if(video.creator.toString() !== req.user.id){
            throw Error();
        } else {
            res.render("editVideo", {pageTitle:`Edit ${video.title}`, video});
        }        
    } catch (error) {        
        console.log(error);
        res.redirect(routes.home);
    }    
};
//수정 post
export const postEditVideo = async(req,res) =>  {
    const {
        params: {id},
        body: {title, description}
    }=req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description});
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

//비디오 삭제
export const deleteVideo = async(req,res) =>  {
    const {
        params: {id}
    } = req;
    try {
        // await Video.findOneAndRemove({_id:id});
        const video = await Video.findById(id);
        if(video.creator.toString() !== req.user.id){
            throw Error();
        } else {            
            await Video.findOneAndRemove({_id:id});
        }
    } catch (error) {        
        // res.render("deleteVideo", {pageTitle:"Delete Video"});
    }
    res.redirect(routes.home);
}
