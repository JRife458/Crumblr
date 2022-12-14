import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import PostEditForm from './EditPostForm';

function EditPostModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h5 className='edit-post-button' onClick={() => setShowModal(true)}>Edit Post</h5>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostEditForm post={post} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
