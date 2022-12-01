import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkReadAllPosts } from "../../../store/postsReducer";
import PostCards from '../PostCards'
import '../Posts.css'

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
    <div className="post-feed">
        {allPostsArr &&
          allPostsArr.map((post)=> (
            <PostCards key={post.id} post={post} />
          ))}
    </div>
  )
}

export default RecentPosts;
