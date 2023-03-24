import * as api from '../api';
import * as type from '../constants/actionTypes'


//Action Creators

//Get Posts
export const getPosts = (page) => async (dispatch) =>{
    try {
        dispatch({type: type.START_LOADING})
        const {data} = await api.fetchPosts(page);
        // console.log(data)
         const action = { type: type.FETCH_POSTS, payload: data };
         dispatch(action);
         dispatch({ type: type.END_LOADING });
    } catch (error) {
        console.log(error);
    }
   
}

//Get Post by id
export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: type.START_LOADING });
    const { data } = await api.fetchPostById(id);
    // console.log(data)
    const action = { type: type.FETCH_POST_BY_ID, payload: data };
    dispatch(action);
    dispatch({ type: type.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//Get Posts by Search
export const getPostsBySearch = (searcQuery) => async (dispatch) => {
  try {
    dispatch({ type: type.START_LOADING });
    const { data : {data} } = await api.fetchPostsBySearch(searcQuery);
    // console.log(data);
    const action = { type: type.FETCH_POSTS_BY_SERACH, payload: data };
    dispatch(action);
    dispatch({ type: type.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//Create new Post
export const createPost = (post,history) => async (dispatch) =>{
    try {
        dispatch({ type: type.START_LOADING });
        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`)
         const action = { type: type.CREATE_POST, payload: data };
         dispatch(action);
         dispatch({ type: type.END_LOADING });
    } catch (error) {
        console.log(error);
    }
   
}

//Update new Post
export const updatePost = (id,post) => async (dispatch) =>{
    try {
        dispatch({ type: type.START_LOADING });
        const { data } = await api.updatePost(id,post);
         const action = { type: type.UPDATE_POST, payload: data };
         dispatch(action);
         dispatch({ type: type.END_LOADING });
    } catch (error) {
        console.log(error);
    }
   
}

//Delete new Post
export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: type.START_LOADING });
         await api.deletePost(id);
         const action = { type: type.DELETE_POST, payload : id};
         dispatch(action);
         dispatch({ type: type.END_LOADING });
    } catch (error) {
        console.log(error);
    }
   
}

//Like new Post
export const likePost = (id) => async (dispatch) => {
    try {
         const {data} = await api.likePost(id);
         const action = { type: type.LIKE_POST, payload: data };
         dispatch(action);
    } catch (error) {
        console.log(error);
    }
   
}

export const commentPost =(comment,id) => async (dispatch) => {
  try {
    try {
      const { data } = await api.createComment(comment,id);
      console.log('sent')
      const action = { type: type.CREATE_COMMENT, payload: data };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    
  }
}