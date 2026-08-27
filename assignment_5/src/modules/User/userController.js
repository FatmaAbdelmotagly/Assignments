import { Router } from "express";
import { signup,createOrUpdate,getUserEmail,getUserID } from "./userService.js";
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();

router.post("/signup",async (req,res,next)=>{
    const user = await signup(req.body);
    successResponse({message:"user created ❤️",status:201,data:user, res});
    
})
router.put("/:U_id",async (req,res,next)=>{
    const user = await createOrUpdate(req);
    successResponse({message:"user updated or created ❤️",status:200,data:user, res});
    
})
router.get("/byEmail",async (req,res,next)=>{
    const user = await getUserEmail(req.query);
    successResponse({status:200,data:user, res});
    
})
router.get("/:U_id",async (req,res,next)=>{
    const user = await getUserID(req);
    successResponse({data:user,status:200,data:user, res});
    
})


export default router;