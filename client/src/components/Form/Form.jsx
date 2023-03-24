import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import { Typography, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch , useSelector} from 'react-redux';
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setcurrentId }) => {

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setpostData] = useState({
    title: "",
    author: "",
    description: "",
    tags: "",
    selectedFile: "",
  });
  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit =  (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId,postData));
    }else{
      dispatch(createPost({ ...postData, author: user?.result?.firstName },history));
      clearForm();
    }
    
   
  };
  const clearForm = (e) => {
    setcurrentId(null)
    setpostData({
      title: "",
      description: "",
      tags: "",
      selectedFile: "",
    });
  }
  if (!user?.result?.firstName){
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'> Sign up to create your Post</Typography>
      </Paper>
    )
  }
    return (
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Edit" : "Create"} New Post
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            margin="normal"
            value={postData.title}
            onChange={(e) =>
              setpostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            multiline
            minRows={4}
            fullWidth
            margin="normal"
            value={postData.description}
            onChange={(e) =>
              setpostData({ ...postData, description: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (seprate tags with comma)"
            fullWidth
            margin="normal"
            value={postData.tags}
            onChange={(e) =>
              setpostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setpostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            {currentId ? "Update" : "Create"}
          </Button>
          {!currentId ? (
            ""
          ) : (
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={clearForm}
            >
              Create New
            </Button>
          )}
        </form>
      </Paper>
    );
};

export default Form