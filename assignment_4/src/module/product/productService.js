import { db } from "../../DB/connection.db.js";

export const createProduct = async (inputs) => {
  const { ProductName, Price, StockQuantity, SupplierID } = inputs;
  const insertQuery =
    "INSERT INTO Products(ProductName,Price,StockQuantity,SupplierID) VALUES (?,?,?,?)";
  // console.log(inputs);

  const product = await db.execute(insertQuery, [
    ProductName,
    Price,
    StockQuantity,
    SupplierID,
  ]);
  return product;
};
export const getAllProducts = async () => {
  const getQuery = "select * from Products";
  const products = await db.execute(getQuery);
  return products;
};
export const getProductByID = async (inputs) => {
  const { ProductID } = inputs;
  const getQuery = "select * from Products where ProductID = ? ";
  const product = await db.execute(getQuery, [ProductID]);
  return product;
};
export const updateProduct = async (inputs) => {
  const { ProductID } = inputs.params;
  const { ProductName, Price, StockQuantity, SupplierID } = inputs.body;
  const updateQuery =
    "Update Products SET SupplierID=?,ProductName=?,Price=?,StockQuantity=? WHERE ProductID = ?";
  const product = await db.execute(updateQuery, [
    SupplierID,
    ProductName,
    Price,
    StockQuantity,
    ProductID,
  ]);
  return product;
};

export const deleteProduct = async (inputs) => {
  const { ProductID } = inputs;
  const deleteQuery = "Delete from Products where ProductID=? ";
  const product = await db.execute(deleteQuery, [ProductID]);
};
////////////////////////---->DDL
export const addCategory = async () => {
  const addQuery = "alter table Products ADD Category VARCHAR(100)";
  await db.execute(addQuery);
};
export const deleteCategory = async () => {
  const deleteQuery = "alter table Products drop column Category ";
  await db.execute(deleteQuery);
};
export const changeContact = async () => {
  const Query =
    "ALTER TABLE Products CHANGE ContactNumber ContactNumber VARCHAR(15);";
  await db.execute(Query);
};
export const changeProductConstrain = async () => {
  const Query = "ALTER TABLE Products MODIFY ProductName TEXT NOT NULL;";
  await db.execute(Query);
};
export const insertproducts = async (inputs) => {
  const { SupplierName } = inputs;
  const [supplier] = await db.execute(
    "SELECT SupplierID FROM Suppliers WHERE SupplierName = ?",
    [SupplierName],
  );
  const SupplierID = supplier[0].SupplierID;
  const Query = `
        INSERT INTO Products(ProductName, Price, StockQuantity, SupplierID)VALUES(?, ?, ?, ?),(?, ?, ?, ?),(?, ?, ?, ?)`;
  await db.execute(Query, [
    "Milk",
    15.0,
    50,
    SupplierID,
    "Bread",
    10.0,
    30,
    SupplierID,
    "Eggs",
    20.0,
    40,
    SupplierID,
  ]);
};
export const updateBread = async (inputs) => {
  const { ProductName } = inputs;
  const [Bread] = await db.execute(
    "SELECT ProductID FROM Products WHERE ProductName = ?",
    [ProductName],
  );
  if (Bread.length === 0) {
    throw new Error("Product not found");
  }
  const ProductID = Bread[0].ProductID;
  const Query = ` update Products set Price= 25.00 where ProductID = ?`;
  await db.execute(Query, [ProductID]);
};
export const deleteEggs = async () => {
  const [Eggs] = await db.execute(
    "SELECT ProductID FROM Products WHERE ProductName = ?",
    ["Eggs"],
  );
  if (Eggs.length === 0) {
    throw new Error("Product not found");
  }
  const ProductID = Eggs[0].ProductID;
  const Query = ` delete from Products where ProductID = ?`;
  await db.execute(Query, [ProductID]);
};

export const highestStokQuentity = async () => {
  const Query =
    "select * from Products where StockQuantity =(select MAX(StockQuantity) from Products)	";
  const [rows] = await db.execute(Query);
  return rows;
};
export const productNeverSold = async () => {
  const Query =
    "select p.* FROM Products p LEFT JOIN Sales s ON p.ProductID  = s.ProductID  WHERE s.QuantitySold = 0";
  const [rows] = await db.execute(Query);
  return rows;
};
