import { db } from "../../DB/connection.db.js";
export const createStoreManager = async () => {
  await db.query(`
        CREATE USER IF NOT EXISTS 'store_manager'@'localhost'
        IDENTIFIED BY '123456'
    `);

  await db.query(
    "GRANT SELECT, INSERT, UPDATE ON nodejs.* TO 'store_manager'@'localhost'",
  );

  return "store_manager created and permissions granted";
};
export const revokeUpdate = async () => {
  await db.query(`REVOKE UPDATE ON nodejs.* FROM 'store_manager'@'localhost' `);
  return "UPDATE permission revoked successfully";
};
export const grantDeleteSales = async () => {
  await db.query(
    `GRANT DELETE ON nodejs.Sales TO 'store_manager'@'localhost' `,
  );
  return "DELETE permission granted on Sales successfully";
};
