import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {thunkDeletePost} from '../../../store/postsReducer'
import { thunkFollowUser, thunkUnfollowUser } from "../../../store/sessionReducer";
import PostEditForm from "../EditPost";

function PostCards({post}) {
  const sessionState = useSelector((state) => state.session)
  const sessionUser = sessionState.user
  // const follows = Object.keys(sessionUser.Following)
  let follows = []
  if (sessionUser?.Following) follows = Object.keys(sessionUser.Following)

  let image = post?.url
  const dispatch = useDispatch()

  function deletePost() {
    dispatch(thunkDeletePost(post.id))
  }

  function followUser() {
    dispatch(thunkFollowUser(post.User.id, sessionUser.id))
  }

  function unfollowUser() {
    dispatch(thunkUnfollowUser(post.User.id))
  }

  return (
    <div>
      {sessionUser && follows.includes(`${post.User.id}`) &&
      <button onClick={unfollowUser}>Unfollow User</button>}
      {sessionUser && !follows.includes(`${post.User.id}`) &&
      <button onClick={followUser}>Follow User</button>}
      <p>{post.body}</p>
      {image &&
      <img src={image} alt="post"></img>}
      {sessionUser?.id === post?.User?.id &&
        <button onClick={deletePost}>Delete Post</button>}
      {sessionUser?.id === post?.User?.id &&
        <PostEditForm post={post} />}
    </div>
  )
}

export default PostCards;
