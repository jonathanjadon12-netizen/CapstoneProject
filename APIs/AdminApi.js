import exp from "express";
import { UserModel } from "../Models/UserModel.js";
import { ArticleModel } from "../Models/ArticleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const adminRoute = exp.Router();

// read all articles
adminRoute.get("/articles/:adminId", verifyToken, async (req, res) => {
  const { adminId } = req.params;

  const admin = await UserModel.findById(adminId);
  if (!admin || admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Invalid admin" });
  }

  const articles = await ArticleModel.find({ isArticleActive: true })
    .populate("author", "firstName");

  res.status(200).json({
    message: "All articles",
    payload: articles,
  });
});

// block user
adminRoute.put("/block-user/:adminId/:userId", verifyToken, async (req, res) => {
  const { adminId, userId } = req.params;

  const admin = await UserModel.findById(adminId);
  if (!admin || admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized admin" });
  }

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { $set: { isACTIVE: false } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User blocked successfully",
    payload: user,
  });
});

// unblock user
adminRoute.put("/unblock-user/:adminId/:userId", verifyToken, async (req, res) => {
  const { adminId, userId } = req.params;

  const admin = await UserModel.findById(adminId);
  if (!admin || admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized admin" });
  }
  const user = await UserModel.findByIdAndUpdate(
    userId,{ $set: { isACTIVE: true } },
    { new: true }
  );

  res.status(200).json({message: "User unblocked successfully",payload: user});
});