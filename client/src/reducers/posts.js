
const posts = (state = {isLoading:true, posts:[]}, action) =>{
    switch (action.type) {
      case "FETCH_POSTS":
        return {
          ...state,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        };
      case "FETCH_POSTS_BY_SERACH":
        return {
          ...state,
          posts: action.payload,
        };
      case "FETCH_POST_BY_ID":
        return {
          ...state,
          post: action.payload,
        };
      case "CREATE_POST":
        return { ...state, posts: [...state.posts, action.payload] };
      case "UPDATE_POST":
      case "LIKE_POST":
      case "CREATE_COMMENT":
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        };
      case "DELETE_POST":
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
        };
      case "START_LOADING":
        return { ...state, isLoading: true };
      case "END_LOADING":
        return { ...state, isLoading: false };
      default:
        return state;
    }
}

export default posts