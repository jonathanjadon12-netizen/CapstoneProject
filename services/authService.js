import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../Models/UserModel.js';
import {config} from 'dotenv';
config()
//register function
export const register = async(userObj)=>{
    //create document
    const userDoc=UserModel(userObj)
    //validate for empty password
    await userDoc.validate()
    //hash and replace plain password
    userDoc.password=await bcrypt.hash(userDoc.password,20)
    //save
    const created = await userDoc.save()
    //convert document to object and remove password
    const newUserObj = created.toObject();
    //remove password
    delete newUserObj.password;
    return newUserObj;
};


//authenticate function
export const authenticate =async(email,password,role)=>{
    //check user with email & role
    const user=await UserTypeModel.findOne({email,role})
    if(!user){
        const error = new Error("Invalid email or role")
        error.status=404;
        throw error;
    }
    //compare password
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        const error=new Error("Invalid password");
        error.status=401;
        throw error;
    }
    //generate token
    const token = jwt.sign({userId:user._id,
        role:user.role,email:user.email},
        process.env.JWT_SECRET,{
            expiresIn:"1H"});
        const userObj=user.toObject();
        delete userObj.password;
    return {token,userObj};
    }