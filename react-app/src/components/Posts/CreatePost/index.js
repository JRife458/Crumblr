import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './CreatePost.css'
import { thunkCreatePost } from "../../../store/postsReducer";


function PostCreateForm() {
  const [type, setType] = useState('text')
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);

  let dispatch = useDispatch()

  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = []
    let newPost = await dispatch(thunkCreatePost(
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
      setType('text')
      setBody('')
      setUrl('')
      console.log(newPost)
      history.push(`/`)
    }
  }
  return (
    <div className="post-create">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit} className='post-create-form'>
          <label>
          <i class="fa-solid fa-quote-left"></i>
          <input
          name='type'
          type="radio"
          checked={type === 'text'}
          value='text'
          onChange={(e) => setType(e.target.value)}
          />
          </label>
          <label>
          <i className="fa-solid fa-camera"></i>
          <input
          name='type'
          type="radio"
          checked={type === 'photo'}
          value='photo'
          onChange={(e) => setType(e.target.value)}
          />
          </label>
        <label className="post-create-input">
          <p>Body</p>
          <textarea
          name="body"
          onChange={(e) => {setBody(e.target.value)}}
          value={body}
          >
          </textarea>
        </label>
        <label className="post-create-input">
          <p>URL</p>
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
