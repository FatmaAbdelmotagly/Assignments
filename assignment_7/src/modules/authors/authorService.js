import { db } from'../../DB/DBconnection.js';


export const insertAuthor = async (inputs) => {
    // console.log(inputs);
    console.log("DB:", db.databaseName);
  const author = await db.collection("Authors").insertOne(inputs)
  return author;
  
};

