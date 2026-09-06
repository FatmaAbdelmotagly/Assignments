import { Router } from "express";
const router = Router();
import{signup, login,update,deleteUser,getUserByID} from './userService.js'
import{successResponse} from '../../common/utils/successResponse.js'


router.post("/signup",async(req,res,next)=>{
    const user = await signup(req.body)
    successResponse({res, status:201, data : user , message :"user added ❤️"})
})
router.post("/login",async(req,res,next)=>{
    const user = await login(req.body)
    successResponse({res, status:201, data : user})
})
router.patch("/update",async(req,res,next)=>{
    const user = await update(req.body)
    successResponse({res, status:201, data : user})
})
router.delete("/delete",async(req,res,next)=>{
    const user = await deleteUser(req.query)
    successResponse({res, status:201, data : user})
})
router.get("/",async(req,res,next)=>{
    const user = await getUserByID(req.query)
    successResponse({res, status:201, data : user})
})




export default router