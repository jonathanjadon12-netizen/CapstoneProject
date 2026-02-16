import exp from 'express';
import {authenticate,register} from '../services/authService.js';
import {UserModel} from '../Models/UserModel.js';
import {ArticleModel} from '../Models/ArticleModel.js';
import { checkAuthor } from '../middlewares/checkAuthor.js';
export const authorRouter = exp.Router();

//Register author
authorRouter.post('/authors',async(req,res,next)=>{
    //get author obj from req body
    let authorObj=req.body;
    //call register
    const newAuthorObj=await register({...authorObj,role:"AUTHOR"})
    res.status(201).json({message:"author created successfully",payload:newAuthorObj});
})

//Authenticate author

authorRouter.post('/authors/authenticate',async(req,res)=>{
    //get author cred object
    const authorCred=req.body;
    //call authenticate
    let {token,author}=await authenticate(authorCred)
    //save token as http only cookie
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    //send res
    res.status(200).json({message:"login success",payload:author});
})


//Create articles
authorRouter.post('/articles',async(req,res)=>{
    //get article obj from req body
    const article=req.body;
    //check for the author in req obj
    let author=await UserModel.findById(article.author)
    if(!author || author.role!=="AUTHOR"){
        return res.status(201).json({message:"author not found"})
    }
    //create article document
    const articleDoc=ArticleModel(article)
    //save article
    const created=await articleDoc.save()
    //send res
    res.status(201).json({message:"article created successfully",payload:created})
})



//read all articles
authorRouter.get('/articles/:authorId',async(req,res)=>{

    //get author id
let authorId=req.params.authorId
//check the author
let author=await UserModel.findById(authorId)

if(!author || author.role!=="AUTHOR"){
    return res.status(201).json({message:"author not found"})
}
//read articles by this author which are active
let articles=await ArticleModel.find({author:authorId,isArticleActive:true})
//send res
res.status(200).json({message:"success",payload:articles})
})



//edit articles
authorRouter.put("/articles",checkAuthor,async(req,res)=>{
    //get modified article from req
    let articleObj=req.body;
    //find article
    if(!articleOfDB){
        res.status(201).json({message:"article not found"})
    }
    
    
    //update the article
    
    
    //send res(updated article)
})

//delete articles