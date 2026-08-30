import { Router } from "express";
import { insertlog } from "./logService.js";
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();

router.post("/",async (req,res,next)=>{
    const log = await insertlog(req.body);
    successResponse({message:"log created ❤️",status:201,data:log, res});
    
})

export default router;