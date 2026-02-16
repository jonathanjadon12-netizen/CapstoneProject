import { UserModel } from "../Models/UserModel.js";

export const checkAuthor = async (req, res, next) => {
    // get author id
    const aid = req.body?.author || req.params?.authorId;

    // verify author
    const author = await UserModel.findById(aid);

    if (!author || author.role !== "AUTHOR") {
    return res.status(401).json({ message: "invalid author" });
    }
    //if author not found
    if(!author){
        return res.status(401).json({message:"invalidn author"});
    }
    //if author found but not authorized
    // forward request to next
    next();
}