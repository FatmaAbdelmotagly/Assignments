import { Router } from "express";
import { createComment,updateComment,findOrCreateComment,searchComments,getNewestComments,getCommentDetails} from "./commentService.js";
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();

router.post("/",async (req,res,next)=>{
    const comments = await createComment(req.body);
    successResponse({message:"comment created ❤️",status:201,data:comments, res});
    
})
router.patch("/:C_id", async (req, res, next) => {

    const comment =await updateComment(req);
    successResponse({status: 200, res , comment });
});
router.post("/findorcreate",async (req,res,next)=>{
    const comment = await findOrCreateComment(req.body);
    successResponse({status:200,data:comment, res});
    
})
router.get("/search",async (req,res,next)=>{

    const { word } = req.query;

    const result = await searchComments(word);
    successResponse({data:result,status:200, res});
    
})
router.get("/newest/:P_id",async (req,res,next)=>{

    const result = await getNewestComments(req.params);
    successResponse({data:result,status:200, res});
    
})
router.get("/details/:C_id",async (req,res,next)=>{

    const result = await getCommentDetails(req.params);
    successResponse({data:result,status:200, res});
    
})


export default router;