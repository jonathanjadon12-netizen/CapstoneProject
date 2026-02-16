import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import {userRoute} from './APIs/UserApi.js'
import {authorRouter} from './APIs/AuthorApi.js'
import {adminRoute} from './APIs/AdminApi.js'

//configure env variables
config()
const app=exp()
//add body parser middleware
app.use(exp.json())

//connect APIs
app.use('/user-api',userRoute)
app.use('/author-api',authorRouter)
app.use('/admin-api',adminRoute)

// connect to db
const connectionDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connected successfully")
    //start the server
    app.listen(process.env.PORT,()=>{
        console.log('Server is running on port 4000')
    })
    }catch(err){
    console.log("Error in DB connection",err)
    }
}
connectionDB()



//error handling middleware
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.json({message:"error",error:err.message})
})