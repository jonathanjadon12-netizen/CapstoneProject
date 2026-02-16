import exp from 'express';
import {authenticate,register} from '../services/authService.js';
export const userRoute = exp.Router();

//Register user
userRoute.post('/users',async(req,res,next)=>{
    //get user obj from req body
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"USER"})
    res.status(201).json({message:"user created successfully",payload:newUserObj});
})

//Authenticate user
userRoute.post('/users/authenticate',async(req,res)=>{
    //get user cred object
    const userCred=req.body;
    //call authenticate
    let {token,user}=await authenticate(userCred)
    //save token as http onlt cookie
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    //send res
    res.status(200).json({message:"login success",payload:user});
})

//read all articles
//Add comments to articles