import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: { 
    type: [String], 
    default: [] 
},
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model('Posts', postSchema);

export default Post;