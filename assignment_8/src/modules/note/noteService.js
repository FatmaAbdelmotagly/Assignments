import { noteModel } from "../../DB/Model/noteModel.js";
import { UserModel } from "../../DB/Model/userModel.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const addNote = async (inputs) => {
  const { userId } = inputs.query;
  const { title, content } = inputs.body;
  const note = await noteModel.insertOne({ title, content, userId });
  return note;
};

export const updateNote = async (inputs) => {
  const { userId } = inputs.query;
  const { noteId } = inputs.params;
  const { title, content } = inputs.body;

  const NOte = await noteModel.findById(noteId);
  if (!NOte) {
    throw new Error("note not found", { cause: { status: 404 } });
  }
  if (NOte.userId != mongoose.Types.ObjectId(userId)) {
    throw new Error("you are not the owner of this note", {
      cause: { status: 409 },
    });
  }
  const updatedNote = await noteModel.findByIdAndUpdate(
    noteId,
    {
      $set: { title, content },
    },
    {
      returnDocument: "after",
    },
  );

  return updatedNote;
};
export const replaceNote = async (inputs) => {
  const { userId } = inputs.query;
  const { noteId } = inputs.params;
  const { title, content } = inputs.body;
  const NOte = await noteModel.findById(noteId);
  if (!NOte) {
    throw new Error("note not found", { cause: { status: 404 } });
  }
  if (NOte.userId != mongoose.Types.ObjectId(userId)) {
    throw new Error("you are not the ownerof this note", {
      cause: { status: 409 },
    });
  }
  const replaced = await noteModel.findOneAndReplace(
    { _id: noteId },
    {
      $set: { title, content },
    },
    {
      returnDocument: "after",
    },
  );

  return replaced;
};
export const updateAll = async (inputs) => {
  const { userId } = inputs.query;
  const { title } = inputs.body;
  const user = await UserModel.findById(mongoose.Types.ObjectId(userId));
  if (!user) {
    throw new Error(" user id not found ", { cause: { status: 404 } });
  }
  const update = await noteModel.updateMany(
    { userId: user._id },
    {
      $set: { title },
    },
  );
  return update;
};
export const deleteNote = async (inputs) => {
  const { userId } = inputs.query;
  const { noteId } = inputs.params;
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error(" user id not found ", { cause: { status: 404 } });
  }
  const note = await noteModel.findById(noteId);
  if (!note.userId.equals(mongoose.Types.ObjectId(userId))) {
    throw new Error("you are not the user of this note", {
      cause: { status: 409 },
    });
  }

  const deleted = await noteModel.findOneAndDelete({ _id: noteId });
  return deleted;
};
export const getAllNotes = async (inputs) => {
  const { userId, limit, page } = inputs.query;
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error(" user id not found ", { cause: { status: 404 } });
  }
  const skip = (page - 1) * limit;
  const notes = await noteModel
    .find({ userId: mongoose.Types.ObjectId(userId) })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return notes;
};
export const getNoteById = async (inputs) => {
  const { userId } = inputs.query;
  const { noteId } = inputs.params;
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error(" user id not found ", { cause: { status: 404 } });
  }
  const note = await noteModel.findById(noteId);
  if (!note) {
    throw new Error("note not found ", { cause: { status: 404 } });
  }
  if (!note.userId.equals(mongoose.Types.ObjectId(userId))) {
    throw new Error("you are not the owner ", { cause: { status: 404 } });
  }
  return note;
};
export const getNoteByContent = async (inputs) => {
  const { userId, content } = inputs.query;
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error(" user id not found ", { cause: { status: 404 } });
  }
  const note = await noteModel.findOne({ content: content });
  if (!note) {
    throw new Error("note not found ", { cause: { status: 404 } });
  }
  if (!note.userId.equals(mongoose.Types.ObjectId(userId))) {
    throw new Error("you are not the owner ", { cause: { status: 404 } });
  }
  return note;
};
export const getNotesWithUser = async (inputs) => {
  const { userId } = inputs.query;

  const notes = await noteModel
    .find(
      {
        userId: mongoose.Types.ObjectId(userId),
      },
      {
        title: 1,
        userId: 1,
        createdAt: 1,
      },
    )
    .populate("userId", "email -_id");

  return notes;
};
export const getNotesAggregate = async (inputs) => {
  const { userId, title } = inputs.query;

  const match = { userId: new mongoose.Types.ObjectId(userId) };
  if (title) {
    match.title = { $regex: title };
  }
  const notes = await noteModel.aggregate([
    {
      $match: match,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        createdAt: 1,
        user: {
          name: "$user.name",
          email: "$user.email",
        },
      },
    },
  ]);
  return notes;
};
export const deleteAllNote =async (inputs)=>{
    const {userId}=inputs.query
    const user = await UserModel.findById(userId)
    if (!user){
        throw new Error ( " id not found ", {cause:{status:404}})
    }
    await noteModel.deleteMany({userId })
}