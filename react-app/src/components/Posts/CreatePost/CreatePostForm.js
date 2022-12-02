import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './CreatePost.css'
import { thunkCreatePost } from "../../../store/postsReducer";


function PostCreateForm({setShowModal}) {
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);

  let dispatch = useDispatch()

  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = []
    let type = 'text'
    await dispatch(thunkCreatePost(
      type,
      body,
      url
      )
    ).catch(async (res) => {
      const data = await res.json()
      if (data && data.errors) errors.push(data.errors)
      setValidationErrors(errors)
    })
    if (validationErrors.length <= 0) {
      setBody('')
      setUrl('')
      setShowModal(false)
    }
  }
  return (
    <div className="post-create">
      <h2>Create a Post</h2>
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
          Create Post
        </button>
      </form>
    </div>
  )


}

export default PostCreateForm;
