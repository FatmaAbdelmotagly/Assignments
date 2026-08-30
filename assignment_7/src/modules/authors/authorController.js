import { Router } from "express";
import {insertAuthor} from './authorService.js'
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();

router.post("/authors",async (req,res,next)=>{
    const author = await insertAuthor(req.body);
    successResponse({message:"author created ❤️",status:201,data:author, res});
    
})

export default router;