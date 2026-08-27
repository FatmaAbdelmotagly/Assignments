import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DBconnection.js";
import { userModel } from "./userModel.js";



export class post extends Model {}

post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "P_id"
        },

        title: {
            type: DataTypes.STRING(5000),
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },

       
    },
    {
        sequelize,
        modelName: "posts",
        timestamps: true,
        paranoid: true
    }
);
post.belongsTo(userModel,
    {
        foreignKey:{name:"P_U_id",allowNull:false},
        onDelete: "CASCADE",
        onUpdate:"CASCADE"
    }
)
