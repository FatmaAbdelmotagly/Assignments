import { db } from "../../DB/DBconnection.js";
//1
export const createBooksCollection = async () => {
   await db.createCollection("Books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "title is required 😤",
          },
        },
      },
    },
  });
};

export const createCappedCollection = async () => {
  const collection = await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });

  return collection;
};

//4
export const createBooksIndex = async () => {
  await db.collection("books").createIndex({
    title: 1,
  });
};
//5
export const insertDocument = async (inputs) => {
  const doc = await db.collection("books").insertOne(inputs);
  return doc;
};
//6
export const insertManyDocument = async (inputs) => {
  const doc = await db.collection("books").insertMany(inputs);
  return doc;
};

export const updateBook = async () => {
  const result = await db
    .collection("books")
    .updateOne({ title: "Future" }, { $set: { year: 2022 } });
  //  console.log(result);
  if (!result.matchedCount)
    throw new Error("there is no book with title future");
  return result;
};

export const getBook = async (inputs) => {
  const name = inputs;
  const book = await db.collection("books").find({ title: name }).toArray();
  return book;
};
export const getBookByYear = async (inputs) => {
  const { from, to } = inputs;
  const books = await db
    .collection("books")
    .find({
      year: {
        $gte: Number(from),
        $lte: Number(to),
      },
    })
    .toArray();
  return books;
};

export const findBooksBycategory = async (inputs) => {
  const category = inputs.category;

  const books = await db
    .collection("books")
    .find({
      category: category,
    })
    .toArray();

  if (books.length < 1)
    throw new Error("no books found ", { cause: { status: 404 } });

  return books;
};

export const skipLimitBooks = async () => {
  const books = await db
    .collection("books")
    .find({})
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
  if (books.length < 1)
    throw new Error("no books found ", { cause: { status: 404 } });
  return books;
};

export const findBooksWithIntegerYear = async () => {
  const books = await db
    .collection("books")
    .find({
      year: { $type: "int" },
    })
    .toArray();
  if (books.length < 1)
    throw new Error("no books found ", { cause: { status: 404 } });
  return books;
};

export const excludeGenres = async () => {
  const books = await db
    .collection("books")
    .find({
      category: {
        $nin: ["Horror", "Science Fiction"],
      },
    })
    .toArray();

  return books;
};

export const deleteBooksBeforeYear = async (year) => {
  //console.log(year);

  const result = await db.collection("books").deleteMany({
    year: {
      $lt: Number(year),
    },
  });
  return result;
};

export const aggregate1 = async () => {
  const result = await db
    .collection("books")
    .aggregate([
      {
        $match: {
          year: {
            $gt: 2000,
          },
        },
      },
      {
        $sort: {
          year: -1,
        },
      },
    ])
    .toArray();

  if (result.length < 1)
    throw new Error("no books found ", { cause: { status: 404 } });
  return result;
};
export const aggregate2 = async () => {
  const result = await db
    .collection("books")
    .aggregate([
      {
        $match: {
          year: {
            $gt: 2000,
          },
        },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          year: 1,
          author: 1,
        },
      },
    ])
    .toArray();

  if (result.length < 1)
    throw new Error("no books found ", { cause: { status: 404 } });
  return result;
};

export const aggregate3 = async () => {
    const result = await db.collection("books").aggregate([
        {
            $unwind: "$category"
        }]).toArray();

    return result;
};

export const aggregate4 = async () => {
   const result = await db.collection("books").aggregate([
    {
        $lookup: {
            from: "logs",
            let: {
                bookId: { $toString: "$_id" }
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ["$bookId", "$$bookId"]
                        }
                    }
                }
            ],
            as: "logs"
        }
    }
]).toArray();

    return result;
};