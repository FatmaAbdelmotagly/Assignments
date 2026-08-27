import { DataTypes } from "sequelize";
import { sequelize } from "../DBconnection.js";

export const userModel = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "U_id"
        },

        name: {
            type: DataTypes.STRING(255)
        },

        email: {
            type: DataTypes.STRING(255),
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        role: {
            allowNull: false,
            type: DataTypes.ENUM("user", "admin")
        }
    },
    {
        timestamps: true,

        hooks: {
            beforeCreate(user) {
                if (user.name.length <= 2) {
                    throw new Error("name must be greater than 2 characters");
                }
            }
        },

        validate: {
            checkPasswordLength() {
                if (this.password.length < 6) {
                    throw new Error("password must be at least 6 characters");
                }
            }
        }
    }
);

// userModel.hasOne(comment,
//     {foreignKey:{
//         name : "U_C_id",
//         allowNull : false
//     },
//     onDelete:"CASCADE",
//     onUpdate:"CASCADE"
// })