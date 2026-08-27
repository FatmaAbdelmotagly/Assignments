import { sequelize } from "../../DB/DBconnection.js";
import { userModel } from "../../DB/Model/userModel.js";

export const signup = async (inputs) => {
  const { name, email, password, role } = inputs;
  const user = await userModel.findOne({ where: { email: email } });
  if (user) throw new Error("Email already exists");

  const newUser = await userModel.create({ name, email, password, role });

  return newUser;
};
export const createOrUpdate = async (inputs) => {
  const { U_id } = inputs.params;
  const { name, email, password, role } = inputs.body;
  const user = await userModel.upsert(
    { id: U_id, name, email, password, role },
    {
      validate: false,
    },
  );
  return user;
};
export const getUserEmail = async (inputs) => {
  const { email } = inputs;
  const user = await userModel.findOne({ where: { email } });
  if (!user) throw new Error("email not found ");
  return user;
};
export const getUserID = async (inputs) => {
  const { U_id } = inputs.params;
  const user = await userModel.findOne({
    where: { U_id },
    attributes: {
      exclude: ["role"],
    },
  });
  if (!user) throw new Error("user id not found ");
  return user;
};
