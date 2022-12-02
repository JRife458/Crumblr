import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';
import './SignUpForm.css'

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h2 className='signup-button' onClick={() => setShowModal(true)}>Sign Up</h2>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
