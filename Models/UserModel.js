import{Schema,model}from 'mongoose'

const userSchema=new Schema({

    firstName:{
        type:String,
        required:[true,"first name is required"],
    },
    LastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    profileImageUrl:{
        type:String,
    },
    
        role:{
            type:String,
            enum:["AUTHOR","USER","ADMIN"],
            required:[true,"invalid user"],
        },
        isActive:{
            type:Boolean,
            default:true,
        }

    },{
            timestamps:true,
            strict:"throw",
            versionKey:false
        }
);

export const UserModel=model("users",userSchema)