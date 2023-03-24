import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import {Grid, CircularProgress} from "@material-ui/core"
import { useSelector } from "react-redux";

const Posts = ({ setcurrentId }) => {
  const {posts, isLoading} = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts?.length && !isLoading) return "No Posts"
    //   console.log(posts);
    return isLoading ? (
      <div className={classes.centerLoader}>
        <CircularProgress />
      </div>
    ) : (
      <Grid
        className={classes.mainContainer}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} xs={12} lg={4} xl={3} sm={12} md={6} item>
            <Post post={post} setcurrentId={setcurrentId} />
          </Grid>
        ))}
      </Grid>
    );
};

export default Posts;
