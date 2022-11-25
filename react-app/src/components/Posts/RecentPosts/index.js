import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkReadAllPosts } from "../../../store/postsReducer";
import PostCards from '../PostCards'
import PostCreateForm from "../CreatePost";

function RecentPosts() {
  const sessionState = useSelector((state) => state.session)
  const postsState = useSelector((state) => state.posts);

  const sessionUser = sessionState.user
  const allPosts = postsState.posts
  const allPostsArr = Object.values(allPosts).sort((a, b) => b.id - a.id)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadAllPosts());
  }, [dispatch]);

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

export default RecentPosts;
