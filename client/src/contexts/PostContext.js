import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  FIND_POST,
} from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // get all posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`);
      if (res.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: res.data.posts,
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_LOADED_FAIL,
      });
    }
  };

  // add post
  const addPost = async (newPost) => {
    try {
      const res = await axios.post(`${apiUrl}/posts`, newPost);
      if (res.data.success) {
        dispatch({
          type: ADD_POST,
          payload: res.data.post,
        });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Sever error",
          };
    }
  };

  // Find post when user is updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({
      type: FIND_POST,
      payload: post,
    });
  };

  // update post
  const updatePost = async (post) => {
    try {
      const res = await axios.put(`${apiUrl}/posts/${post._id}`, post);
      if (res.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: res.data.post,
        });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Sever error",
          };
    }
  };

  // delete post
  const deletePost = async (postId) => {
    try {
      const res = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (res.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: postId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Post context data
  const postContextData = {
    postState,
    getPosts,
    addPost,
    updatePost,
    deletePost,
    findPost,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showToast,
    setShowToast,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
