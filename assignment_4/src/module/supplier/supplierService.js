import { db } from "../../DB/connection.db.js";

export const createSupplier = async (inputs) => {
  const { SupplierName, ContactNumber } = inputs;
  const insertQuery =
    "insert into suppliers(SupplierName,ContactNumber) values (?,?)";
  const supplier = await db.execute(insertQuery, [SupplierName, ContactNumber]);
  return supplier;
};
export const getAllSuppliers = async () => {
  const getQuery = "select * from suppliers";
  const suppliers = await db.execute(getQuery);
  return suppliers;
};
export const updateSupplier = async (inputs) => {
  const { SupplierID } = inputs.params;
  const { SupplierName, ContactNumber } = inputs.body;
  const updateQuery =
    "update suppliers set SupplierName=?, ContactNumber=? where SupplierID = ?";
  const supplier = await db.execute(updateQuery, [
    SupplierName,
    ContactNumber,
    SupplierID,
  ]);
  return supplier;
};
export const deleteSupplier = async (inputs) => {
  const { SupplierID } = inputs;
  const deleteQuery = "delete from suppliers where SupplierID=? ";
  const supplier = await db.execute(deleteQuery, [SupplierID]);
};
//6
export const insertFreshFoodSupplier = async () => {
  //a
  const Query =
    'insert into suppliers(SupplierName,ContactNumber)values ("FreshFoods",01001234567)';
  await db.execute(Query);
};

export const supStartWithF = async () => {
  const Query = "select * from Suppliers where SupplierName LIKE ?";
  const sup = await db.execute(Query, ["f%"]);
  return sup;
};
