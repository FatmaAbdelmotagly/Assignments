
import { db } from'../../DB/DBconnection.js';
//7
export const insertlog = async (inputs) => {
    const doc = await db.collection("logs").insertOne(inputs);
    return doc;
};
