import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './CreatePost.css'
import { thunkCreatePost } from "../../../store/postsReducer";


function PostCreateForm({setShowModal}) {
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([])


  let dispatch = useDispatch()

  useEffect(() => {
    let errors = [];
    if (body.length <= 20) errors.push("Body must be at least 20 characters");
    setValidationErrors(errors);
  }, [body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let type = 'text'
    if (!validationErrors.length) await dispatch(thunkCreatePost(
      type,
      body,
      url
      )).then(setShowModal(false))
  }

  return (
    <div className="post-create">
      <h2>Create a Post</h2>
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
        >
          Create Post
        </button>
      </form>
    </div>
  )


}

export default PostCreateForm;
