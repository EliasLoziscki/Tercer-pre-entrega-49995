import mongoose from "mongoose";

const collection = "Users";

const UserSchema = new mongoose.Schema({
    fullName: {
        type:String
    },
    name: {
        type:String
    },
    lastName: {
        type:String
    },
    email: {
        type:String, 
        unique: true,
        required: true
    },
    age: {
        type:Number, 
        required: true
    },
    password: {
        type:String
    },
    cart: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
    rol: {
        type:String, 
        enum:["user","admin"],
        default: "user"}
});

const userModel = mongoose.model(collection, UserSchema);

export default userModel;