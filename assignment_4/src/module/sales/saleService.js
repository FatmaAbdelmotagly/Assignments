import { bootStrap, db } from "../../DB/connection.db.js";

export const createSale = async (inputs) => {
  const { ProductID, QuantitySold } = inputs;
  const insertQuery =
    "insert into sales(ProductID,QuantitySold,SaleDate)values (?,?,?)";
  const sale = await db.execute(insertQuery, [
    ProductID,
    QuantitySold,
    new Date(),
  ]);
};
export const getAllSales = async () => {
  const getQuery = "select * from sales";
  const sales = await db.execute(getQuery);
  return sales;
};
export const getSaleByID = async (inputs) => {
  const { ProductID } = inputs;
  const getQuery = "select * from sales where ProductID =? ";
  const sale = db.execute(getQuery, [ProductID]);
  return sale;
};
export const sale2Mile = async (inputs) => {
  const [product] = await db.execute(
    "SELECT ProductID FROM Products WHERE ProductName = ?",
    ["Milk"],
  );

  const ProductID = product[0].ProductID;
  const getQuery =
    "INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?) ";
  await db.execute(getQuery, [ProductID, 2, "2025-05-20"]);
};
export const getAllQuantitySold = async () => {
  const [quntity] = await db.execute(
    "select Sales.QuantitySold, Products.ProductName from sales left join Products on sales.ProductID=Products.ProductID ",
  );
  return quntity;
};
export const getAllSalesAndProductName = async () => {
  const Query =
    "select sales.QuantitySold,sales.SaleDate , Products.ProductName from sales left join Products on sales.ProductID=Products.ProductID ";
  const [quntity] = await db.execute(Query);
  return quntity;
};
