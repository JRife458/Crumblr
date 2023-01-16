import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFollowUser, thunkUnfollowUser } from "../../../store/sessionReducer";
import { thunkLikePost } from "../../../store/postsReducer";
import EditPostModal from "../EditPost";
import './PostCards.css'
import brokenImageReplacement from '../../../assets/brokenImageReplacement.jpg'

function PostCards({post}) {
  const sessionState = useSelector((state) => state.session)
  const sessionUser = sessionState.user
  let follows = []
  if (sessionUser?.Following) follows = Object.keys(sessionUser.Following)
  let likes = post?.Likes
  let postLiked = likes.includes(sessionUser.id)


  let image = post?.url
  const dispatch = useDispatch()

  function followUser() {
    dispatch(thunkFollowUser(post.User.id, sessionUser.id))
  }

  function unfollowUser() {
    dispatch(thunkUnfollowUser(post.User.id))
  }

  function likePost() {
    dispatch(thunkLikePost(post.id))
  }

  let followButton
  if (follows.includes(`${post.User.id}`)) {
    followButton = <h5 className="follow-button" onClick={unfollowUser}>Unfollow User</h5>
    }
  else followButton = <h5 className="follow-button" onClick={followUser}>Follow User</h5>

  let likeButton
  if (postLiked) {
    likeButton = <h5 className="post-like-button">Unlike this post</h5>
  }
  else likeButton = <h5 className="post-like-button" onClick={likePost}>Like this post</h5>

  return (
    <div className="post-card">
      <div className='post-card-user'>
        <h4 className="post-card-username">{post.User.username}</h4>
        {sessionUser && sessionUser.id !== post.User.id && followButton}
        {sessionUser?.id === post?.User?.id &&
            <EditPostModal className='edit-post-button' post={post} />
        }
      </div>
      {image &&
      <img
      src={image}
      alt="post"
      onError={e => {
        e.currentTarget.src = brokenImageReplacement; }}
      />}
      <div className="post-body-container">
        <div className="post-likes-container">
          <h4 className="post-likes">No likes yet!</h4>
          {likeButton}
        </div>
        <p className="post-body">{post.body}</p>
      </div>
    </div>
  )
}

export default PostCards;
