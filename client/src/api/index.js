import axios from 'axios';


const SERVER_URL = "http://localhost:5000";

const api = axios.create({ baseURL: SERVER_URL });
api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});



//POST API------------------------------
//Get all posts
export const fetchPosts = (page) => api.get(`/posts?page=${page}`);

//Get all posts by search
export const fetchPostsBySearch = (searchQuery) => api.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
//Get all posts by ID
export const fetchPostById = (id) => api.get(`/posts/${id}`);

//CreatePost
export const createPost = (newPosts) => api.post("/posts/create",newPosts);
//Update Post
export const updatePost = (id, updatedPost) => api.patch(`/posts/${id}/update`,updatedPost);
//Delete Post
export const deletePost = (id) => api.delete(`/posts/${id}/delete`);
//Like Post
export const likePost = (id) => api.patch(`/posts/${id}/likePost`);
//Like Post
export const createComment = (comment,id) => api.post(`/posts/${id}/createComment`,{comment});


//AUTH API ---------------------------------------
//Sign in
export const signIn = (formData) => api.post("/user/signin", formData);
//Sign Up
export const signUp = (formData) => api.post("/user/signup", formData);




