import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DBconnection.js";
import { post } from "./postModel.js";
import { userModel } from "./userModel.js";

export class comment extends Model {}

comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "C_id"
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
    },
    {
        sequelize,
        modelName: "comments",
        timestamps: true
    }
);

comment.belongsTo(post, {
    foreignKey:{name: "C_P_id",allowNull:false},
    onDelete : "CASCADE",
    onUpdate :"CASCADE"
});
comment.belongsTo(userModel, {
    foreignKey: {
        name: "U_id",
        allowNull: false
    },
    targetKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});