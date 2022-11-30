import React from "react";
import { useSelector } from "react-redux";

import PostCards from '../PostCards'
import PostCreateForm from "../CreatePost";

function FollowedPosts() {
  const sessionState = useSelector((state) => state.session)

  const sessionUser = sessionState.user
  let allPostsArr = []
    Object.values(sessionUser.Following)
      .map(user => user.Posts
        .map(post => allPostsArr.push(post)))
  allPostsArr.sort((a, b) => b.id - a.id)


  return (
    <div>
      <div>
      {sessionUser && <PostCreateForm />}
        {allPostsArr &&
          allPostsArr.map((post)=> (
            <PostCards key={post.id} post={post} />
          ))}
      </div>
    </div>
  )
}

export default FollowedPosts;
