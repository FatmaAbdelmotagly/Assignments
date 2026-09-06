import { Router } from "express";
const router = Router();
import{addNote,replaceNote,deleteAllNote,getNotesWithUser,getNotesAggregate,deleteNote,updateNote,getNoteByContent,updateAll,getNoteById,getAllNotes} from './noteService.js'
import{successResponse} from '../../common/utils/successResponse.js'

router.post("/",async(req,res,next)=>{
    const note = await addNote(req);
    successResponse({status:201 , message :"note added ", data: note, res})
})

router.patch("/all",async(req,res,next)=>{
    const note = await updateAll(req);
    successResponse({status:201 , message :"ubdated all notes ", data: note, res})
})
router.get("/paginateSort",async(req,res,next)=>{
    const notes = await getAllNotes(req);
    successResponse({status:201 , data: notes, res})
})
router.patch("/:noteId",async(req,res,next)=>{
    const note = await updateNote(req);
    successResponse({status:201 , message :"note updated ", data: note, res})
})
router.put("/replace/:noteId",async(req,res,next)=>{
    const note = await replaceNote(req);
    successResponse({status:201 , message :"note replaces ", data: note, res})
})
router.delete("/",async(req,res,next)=>{
    await deleteAllNote(req);
    successResponse({status:201  , message :"notes deleted ", res})
})
router.delete("/:noteId",async(req,res,next)=>{
    const note = await deleteNote(req);
    successResponse({status:201 , message :"note deleted ", data: note, res})
})

router.get("/aggregate",async(req,res,next)=>{
    const note = await getNotesAggregate(req);
    successResponse({status:201, data: note, res})
})
router.get("/noteByContent",async(req,res,next)=>{
    const note = await getNoteByContent(req);
    successResponse({status:201, data: note, res})
})
router.get("/noteWithUser",async(req,res,next)=>{
    const note = await getNotesWithUser(req);
    successResponse({status:201, data: note, res})
})
router.get("/:noteId",async(req,res,next)=>{
    const note = await getNoteById(req);
    successResponse({status:201, data: note, res})
})





export default router