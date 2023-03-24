import express from "express";
import {
  getPosts,
  getPostsBySearch,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  createComment,
} from "../controllers/postController.js";

//import middleware 
import auth from '../middleware/auth.js'

//Start post router
const router = express.Router();
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPostById);


router.post("/create", auth, createPost);
router.patch("/:id/update", auth, updatePost);
router.delete("/:id/delete", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/createComment", auth, createComment);

export default router