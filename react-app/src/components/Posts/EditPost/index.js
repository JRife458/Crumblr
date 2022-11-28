import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { thunkEditPost } from "../../../store/postsReducer";

function PostEditForm({post}) {
  const [type, setType] = useState(post.type)
  const [body, setBody] = useState(post.body)
  const [url, setUrl] = useState(post.url)
  const [validationErrors, setValidationErrors] = useState([]);

  let dispatch = useDispatch()

  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = []
    let editedPost = await dispatch(thunkEditPost(
      post.id,
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
          Edit Post
        </button>
      </form>
    </div>
  )
}

export default PostEditForm
