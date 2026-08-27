import { sequelize } from "../../DB/DBconnection.js";
import { post } from "../../DB/Model/postModel.js";
import { comment } from "../../DB/Model/commentModel.js";
import { userModel } from "../../DB/Model/userModel.js";
export const createPost = async (inputs) => {
  const { title, P_U_id, content } = inputs;
  const Post = await post.create({ title, P_U_id, content });

  return Post;
};
export const deletePost = async (inputs) => {
  const { P_id } = inputs.params;
  const { userId } = inputs.body;

  const Post = await post.findByPk(P_id);

  if (!Post) {
    throw new Error("post id not found", {
      cause: { status: 404 },
    });
  }

  if (Post.userId != userId) {
    throw new Error("you are not the owner of this post", {
      cause: { status: 403 },
    });
  }
  await Post.destroy();
};
export const getPostsDetails = async () => {

    const posts = await post.findAll({
        attributes: ["id", "title", "P_U_id"]
    });
    const result = [];
  for (const p of posts) {
        const userData = await userModel.findByPk(p.P_U_id, {
            attributes: ["id", "name"]
        });
        const commentsData = await comment.findAll({
            where: {
                C_P_id: p.id
            },
            attributes: ["id", "content"]
        });
        result.push({
            id: p.id,
            title: p.title,
            user: userData,
            comments: commentsData
        });
    }
    return result;
};

export const getPostsCommentCount = async () => {
    const posts = await post.findAll({
        attributes: ["id", "title"]
    });
    const result = [];
    for (const p of posts) {
        const commentsCount = await comment.count({
            where: {
                C_P_id: p.id
            }
        });
        result.push({
            id: p.id,
            title: p.title,
            commentsCount
        });
    }
    return result;
};