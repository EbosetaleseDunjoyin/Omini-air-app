import React, {useState}from "react";
import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { useDispatch} from "react-redux";
import {useHistory} from "react-router-dom"
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setcurrentId }) => {
  const classes = useStyles();
  const [likes, setLikes] = useState(post?.likes)
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === (user?.result?.googleId || user?.result?._id));
  const openPost = (e) =>{
    history.push(`/posts/${post._id}`)
  }
  const handleLike = () =>{
    dispatch(likePost(post._id));
    if(hasLikedPost){
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  }
   const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        onClick={openPost}
        className={classes.cardAction}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.author}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {user?.result?._id === post?.creator && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              title="Update"
              onClick={() => {
                setcurrentId(post._id);
              }}
            >
              <MoreHoriz fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `# ${tag} `)}
          </Typography>
        </div>
        <Typography variant="h6" className={classes.title} gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {post.description.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
