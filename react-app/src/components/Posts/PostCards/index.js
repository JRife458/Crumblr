import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {thunkDeletePost} from '../../../store/postsReducer'
import { thunkFollowUser, thunkUnfollowUser } from "../../../store/sessionReducer";
import PostEditForm from "../EditPost";
import './PostCards.css'

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

  let followButton
  if (follows.includes(`${post.User.id}`)) {
    followButton = <h5 className="follow-button" onClick={unfollowUser}>Unfollow User</h5>
    }
  else followButton = <h5 className="follow-button" onClick={followUser}>Follow User</h5>

  return (
    <div className="post-card">
      <div className='post-card-user'>
        <h4>{post.User.username}</h4>
        {sessionUser && sessionUser.id !== post.User.id && followButton}
      </div>
      {sessionUser?.id === post?.User?.id &&
        <button onClick={deletePost}>Delete Post</button>}
      {sessionUser?.id === post?.User?.id &&
        <PostEditForm post={post} />}
      {image &&
      <img src={image} alt="post"></img>}
      {post.body &&
      <div className="post-body-container">
        <p className="post-body">{post.body}</p>
      </div>}
    </div>
  )
}

export default PostCards;
