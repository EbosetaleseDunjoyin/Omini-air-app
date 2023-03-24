import Post from "../models/post.js";
import mongoose from "mongoose";



//Get Posts
export const getPosts = async(req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 4;
        const startIndex = (Number(page) - 1 ) * LIMIT;// Get start index from every page
        const total = await Post.countDocuments({});
        const totalPages = Math.ceil(total/LIMIT);
        const posts = await Post.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200)
          .json({
            data: posts,
            currentPage: Number(page),
            totalPages: totalPages,
          });
    } catch (error) {
        res.status(400).json({message: error})
    }
  
};

//Get Posts by search
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    }).sort({ _id: -1 });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(400).json({ message: error});
  }
};

//Get Post by id
export const getPostById = async (req, res) => {
   const { id } = req.params;

   try {
     const post = await Post.findById(id);

     res.status(200).json(post);
   } catch (error) {
     res.status(404).json({ message: error });
   }
};

//Create Posts
export const createPost = async (req, res) => {
    const postBody = req.body;
    const newPost = new Post({...postBody, creator: req.userId});
   try {
        await newPost.save()
        res.status(201).json(newPost);

    } catch (error) {
        res.status(400).json({message: error})
    }
};

//Update Posts
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Post not found");
    const postBody = req.body;
   try {
        const updatePost = await Post.findByIdAndUpdate(_id, {...postBody, _id}, { new: true });
        res.status(200).json(updatePost);

    } catch (error) {
        // console.log(error);
        res.status(400).json({message: error})
        
    }
};

//Like Posts
export const likePost = async (req, res) => {
    const { id} = req.params;

      if (!req.userId) {
        return res.status(400).json({ message: "Unauthenticated user" });
      }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post not found");
       
    const post = await Post.findById(id);
     const index = post.likes.findIndex((id) => id === String(req.userId));
    try {
        if (index === -1) {
        post.likes.push(req.userId);
        } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
   
        const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });
    
        res.status(200).json(updatePost);

    } catch (error) {
        res.status(400).json({message: error})
    }
};

//Delete Posts with  _id
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post not found");
    const postBody = req.body;
   try {
         await Post.findByIdAndRemove(id);
        res.status(200).json({message: 'Post Deleted'});

    } catch (error) {
        res.status(409).json({message: error})
    }
};

//Create Comment for post
export const createComment = async (req, res) => {
  const {comment} = req.body;
  const {id } = req.params

   const post = await Post.findById(id);

   post.comments.push(comment);
 
  try {
     const updatedPost = await Post.findByIdAndUpdate(id, post, {
       new: true,
     });
    res.status(201).json({ updatedPost });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};