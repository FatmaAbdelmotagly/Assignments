import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
} from "./postService.js";
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const post = await createPost(req.body);
  successResponse({ message: "post created ❤️", status: 201, data: post, res });
});
router.delete("/:P_id", async (req, res, next) => {
  await deletePost(req);
  successResponse({ message: "post deleted", status: 200, res });
});
router.get("/details", async (req, res, next) => {
  const posts = await getPostsDetails();
  successResponse({ data: posts, status: 200, res });
});
router.get("/commentcount", async (req, res, next) => {
  const posts = await getPostsCommentCount();

  successResponse({ status: 200,data: posts, res, });
});

export default router;
