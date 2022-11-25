import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Type
          <label>
          Text
          <input
          name='type'
          type="radio"
          checked={type === 'text'}
          value='text'
          onChange={(e) => setType(e.target.value)}
          />
          </label>
          <label>
          Photo
          <input
          name='type'
          type="radio"
          checked={type === 'photo'}
          value='photo'
          onChange={(e) => setType(e.target.value)}
          />
          </label>
        </label>
        <label>
          Body
          <textarea
          name="body"
          onChange={(e) => {setBody(e.target.value)}}
          value={body}
          >
          </textarea>
        </label>
        <label>
          URL
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
