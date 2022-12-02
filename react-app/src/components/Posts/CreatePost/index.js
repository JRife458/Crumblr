import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import PostCreateForm from './CreatePostForm';

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostCreateForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
