
import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title : {
        type : String,
        require : true,
         validate :{
            validator: function (value){
            const upper = value.toUpperCase();
                if (value == upper ){
                    return false
                }
                return true
            },
            message : function (){
                return `upper case value is not accepted`
                
            }
        }
    },
    content : {
        type : String,
        unique : true ,
        require : true
    },
    userId : {type : mongoose.Types.ObjectId,ref:"User", require:true}
},{
    timestamps : true

})

export const noteModel = mongoose.model("note" , noteSchema)