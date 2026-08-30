import { db } from "../DBconnection";

export const bookModel = db.collection("Books",{
    validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: {
          bsonType: "string",
          description: "title is required 😤"
        }
      }
    }
  }
})