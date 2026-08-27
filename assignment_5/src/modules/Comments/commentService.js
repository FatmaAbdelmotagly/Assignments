import { sequelize } from "../../DB/DBconnection.js";
import { post } from "../../DB/Model/postModel.js";
import { comment } from "../../DB/Model/commentModel.js";
import { Op } from "sequelize";
import { userModel } from "../../DB/Model/userModel.js";
export const createComment = async (inputs) => {
  const comments = await comment.bulkCreate(inputs);
  return comments;
};

export const updateComment = async (inputs) => {
  const { U_id, content } = inputs.body;
  const { C_id } = inputs.params;

  const Comment = await comment.findByPk(C_id);
  if (!Comment) {
    throw new Error("Comment not found");
  }
  // console.log(Comment);

  if (Comment.U_id != U_id) {
    throw new Error("You are not the owner of this comment");
  }
  Comment.content = content;
  await Comment.save();
  return Comment;
};

export const findOrCreateComment = async (inputs) => {
  const { U_id, content, C_P_id } = inputs;
  const Comment = await comment.findOrCreate({
    where: {
      U_id,
      C_P_id,
      content,
    },
    defaults: {
      U_id,
      C_P_id,
      content,
    },
  });

  return Comment;
};
export const searchComments = async (word) => {
  const result = await comment.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
  if(!result.count) throw new Error("no comments found",{cause:{status:404}})

  return result;
};

export const getNewestComments = async (inputs) => {
const {P_id}=inputs
    const comments = await comment.findAll({
        where: {
            C_P_id: P_id
        },
        order: [
            ["createdAt", "DESC"]
        ],
        limit: 3
    });

    return comments;
};
export const getCommentDetails = async (inputs) => {
const {C_id}=inputs
    const Comment = await comment.findByPk(C_id, {
        include: [
            {
                model: userModel
            },
            {
                model: post
            }
        ]
    });
if (!Comment) {
    throw new Error("Comment not found");
  }
    return Comment;
};
