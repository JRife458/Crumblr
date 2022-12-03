import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { thunkEditPost, thunkDeletePost } from "../../../store/postsReducer";

import './EditPost.css';

function PostEditForm({post, setShowModal}) {
  const [body, setBody] = useState(post.body)
  const [url, setUrl] = useState(post.url)
  const [validationErrors, setValidationErrors] = useState([]);

  let dispatch = useDispatch()

  function deletePost() {
    setBody('')
    setUrl('')
    dispatch(thunkDeletePost(post.id))
  }

  useEffect(() => {
    let errors = [];
    if (body.length < 20) errors.push("Body must be at least 20 characters");
    if (body.length > 500) errors.push("Body must cannot be more than 500 characters")
    setValidationErrors(errors);
  }, [body]);

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
    <div>
        {validationErrors.map((error, ind) => (
          <p key={ind}>{error}</p>
        ))}
      </div>
    <form onSubmit={handleSubmit} className='post-create-form'>
      <label className="post-create-input">
        <p className="post-create-form-label">Body</p>
        <textarea
        name="body"
        onChange={(e) => {setBody(e.target.value)}}
        className='post-create-text-area'
        value={body}
        maxLength="500"
        minLength="20"
        required
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
