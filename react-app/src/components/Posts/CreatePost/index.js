import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import PostCreateForm from './CreatePostForm';

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h2 className='create-post-button' onClick={() => setShowModal(true)}>Create Post</h2>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostCreateForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
