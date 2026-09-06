import { UserModel } from "../../DB/Model/userModel.js"

export const signup = async(inputs)=>{
    const {name , email , password , phone , age}= inputs
    const account = await UserModel.findOne({email})
    if(account) {
        throw new Error ("email exists", {cause:{status:409}})
    }
    const user = await UserModel.insertOne({name , email , password , phone , age})
    return user;
}

export const login = async (inputs) => {
    const { email, password } = inputs;
    const account = await UserModel.findOne({ email });
    if (!account || account.password !== password) {
        throw new Error("invalid login", {cause: { status: 404 }});
    }
    return account;
};

export const update= async (inputs)=>{
    const { email, ...data } = inputs;
    const user = await UserModel.updateOne(
        { email },
        { $set: data }
    );
    if(!user) throw new Error ("user not fount ", {cause: { status: 404 }})
        return user
}

export const deleteUser = async (inputs)=>{
    const { id } = inputs
    const user = await UserModel.deleteOne({ _id: id });
    if (user.deletedCount === 0) {
        throw new Error("User not found", {cause: { status: 404 }});
    }
    return user;
};

export const getUserByID = async (inputs)=>{
    const { id } = inputs
    const user = await UserModel.findById({ _id: id });
    if (!user) {
        throw new Error("User not found", {cause: { status: 404 }});
    }
    return user;
};