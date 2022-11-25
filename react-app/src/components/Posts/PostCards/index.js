import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {thunkDeletePost} from '../../../store/postsReducer'

function PostCards({post}) {
  const sessionState = useSelector((state) => state.session)
  const sessionUser = sessionState.user
  let image = post?.url
  const dispatch = useDispatch()

  function deletePost() {
    dispatch(thunkDeletePost(post.id))
  }

  return (
    <div>
      <p>{post.body}</p>
      {image &&
      <img src={image} alt="post"></img>}
      {sessionUser?.id === post?.User?.id &&
        <button onClick={deletePost}>Delete Post</button>}
    </div>
  )
}

export default PostCards;
