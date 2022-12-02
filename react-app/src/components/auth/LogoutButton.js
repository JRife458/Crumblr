import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from '../../store/sessionReducer';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <h2 className='logout-button' onClick={onLogout}>Logout</h2>;
};

export default LogoutButton;
