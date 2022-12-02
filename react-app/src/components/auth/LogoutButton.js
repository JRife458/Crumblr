import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/sessionReducer';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <h2 className='logout-button' onClick={onLogout}>Logout</h2>;
};

export default LogoutButton;
