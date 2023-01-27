import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './CreatePost.css'
import { thunkCreatePost } from "../../../store/postsReducer";


function PostCreateForm({setShowModal}) {
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [type, setType] = useState('text')
  const [imageLoading, setImageLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const [postError, setPostError] = useState(false)


  let dispatch = useDispatch()

  useEffect(() => {
    let errors = [];
    if (body.length < 20) errors.push("Body must be at least 20 characters");
    if (body.length > 500) errors.push("Body must cannot be more than 500 characters")
    if (type === "photo" && !image) errors.push("No image file chosen")
    setValidationErrors(errors);
  }, [body, type, image, postError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    setPostError(false)
    if (!validationErrors.length) {
      const imageData = new FormData();
      imageData.append('image', image)
      await dispatch(thunkCreatePost(type, body, imageData)).catch(async (res) => {
        const data = await res.json
        if (data && data.errors) {
          setImageLoading(false)
          setPostError(true)
        }
      })
      if (!validationErrors.length && !postError) {
        setImageLoading(false)
        setShowModal(false)
      }
    }
    setImageLoading(false)
  }

  const updateImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  return (
    <div className="post-create">
      <h2>Create a Post</h2>
      <div>
        {validationErrors.map((error, ind) => (
          <p key={ind}>{error}</p>
        ))}
        {postError && <p>"Error making post, please try again"</p>}
      </div>
      <form id="post-create" onSubmit={handleSubmit} className='post-create-form' encType="multipart/form-data" method="POST">
        <label className="post-create-input">
          <p className="post-create-form-label">Type</p>
          <label> Text
            <input
            name='type'
            type="radio"
            checked={type === 'text'}
            value='text'
            onChange={(e) => setType(e.target.value)}
            />
          </label>
          <label> Image
            <input
            name='type'
            type="radio"
            checked={type === 'photo'}
            value='photo'
            onChange={(e) => setType(e.target.value)}
            />
          </label>
        </label>
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
        {type === 'photo' &&
        <label className="post-create-input">
          <p className="post-create-form-label">Image</p>
          <input
          name='image'
          type="file"
          accept="image/*"
          onChange={updateImage}
          />
        </label>}
        <button disabled={imageLoading} type="submit">{imageLoading ? "...Loading..." : "Create Post"}</button>
      </form>
    </div>
  )


}

export default PostCreateForm;
