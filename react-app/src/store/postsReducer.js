import { normalizeArray } from "../resources";

const READ_ALL_POSTS = 'posts/READ_ALL_POSTS'
const DELETE_POST = 'posts/DELETE_POST'
const CREATE_POST = 'posts/CREATE_POST'
const EDIT_POST = 'posts/EDIT_POST'

// Action Creators

const actionCreatePost = (new_post) => ({
  type: CREATE_POST,
  payload: new_post
})

const actionReadAllPosts = (allPosts) => ({
  type: READ_ALL_POSTS,
  payload: allPosts
})

const actionEditPost = (post) => ({
  type: EDIT_POST,
  payload: post
})

const actionDeletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId
})

// Thunks

export const thunkCreatePost = (type, body, url) => async (dispatch) => {
  const response = await fetch('/api/posts/', {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      body,
      url
    }),
  });
  if (response.ok) {
    const newPost = await response.json()
    dispatch(actionCreatePost(newPost))
    return newPost
  }
}

export const thunkReadAllPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts/`);
  if (response.ok) {
    const allPosts = await response.json();
    dispatch(actionReadAllPosts(allPosts.Posts));
    return allPosts;
  }
};

export const thunkEditPost = (postId, type, body, url) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'put',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      body,
      url
    }),
  });
  if (response.ok) {
    const updatedPost = await response.json()
    dispatch(actionEditPost(updatedPost))
    return updatedPost
  }
}

export const thunkDeletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "delete",
  });
  if (response.ok) {
    dispatch(actionDeletePost(postId));
    return;
  }
};

const initialState = {
  posts: {}
}

const postReducer = (state = initialState, action) => {
  let newState = {...state}

  switch (action.type) {
    case CREATE_POST:
      newState.posts = {...state.posts}
      newState.posts[action.payload.id] = {...action.payload}
      return newState
    case READ_ALL_POSTS:
      newState.posts = normalizeArray(action.payload)
      return newState
    case EDIT_POST:
      newState.posts = {...state.posts}
      newState.posts[action.payload.id] = {...action.payload}
      return newState
    case DELETE_POST:
      newState.posts = {...state.posts}
      delete newState.posts[action.payload]
      return newState
    default:
      return state
  }
}

export default postReducer;
