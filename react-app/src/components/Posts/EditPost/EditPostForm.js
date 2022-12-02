import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { thunkEditPost, thunkDeletePost } from "../../../store/postsReducer";

import './EditPost.css';

function PostEditForm({post, setShowModal}) {
  const [body, setBody] = useState(post.body)
  const [url, setUrl] = useState(post.url)
  const [validationErrors, setValidationErrors] = useState([]);

  let dispatch = useDispatch()

  function deletePost() {
    dispatch(thunkDeletePost(post.id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = []
    await dispatch(thunkEditPost(
      post.id,
      post.type,
      body,
      url
      )
    ).catch(async (res) => {
      const data = await res.json()
      if (data && data.errors) errors.push(data.errors)
      setValidationErrors(errors)
    })
    if (validationErrors.length <= 0) {
      setShowModal(false)
    }
  }

  return (
    <div className="post-create">
    <h2>Edit Post</h2>
    <form onSubmit={handleSubmit} className='post-create-form'>
      <label className="post-create-input">
        <p className="post-create-form-label">Body</p>
        <textarea
        name="body"
        onChange={(e) => {setBody(e.target.value)}}
        className='post-create-text-area'
        value={body}
        >
        </textarea>
      </label>
      <label className="post-create-input">
        <p className="post-create-form-label">Image URL</p>
        <input
        name='url'
        type="text"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        />
      </label>
      <button
      type="submit"
      disabled={!!validationErrors.length}
      >
        Edit Post
      </button>
      <button onClick={deletePost}>Delete Post</button>
    </form>
  </div>
  )
}

export default PostEditForm
