import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from "../auth/LogoutButton";
import PostCreateForm from '../Posts/CreatePost';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import './Navigation.css';
import logo from '../../assets/logo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <LogoutButton />
      </div>
    );

  } else {
    sessionLinks = (
      <div className='login-signup'>
        <SignUpFormModal />
        <LoginFormModal />
      </div>
    );
  }

  return (
    <div className='header'>
      <div className='nav-logo-container'>
        <img className='nav-logo' alt='logo' src={logo}></img>
      </div>
    <div className='navigation-list'>
        <NavLink exact to="/" className='nav-link'>
        <h2>Recent Posts</h2>
        </NavLink>
        {sessionUser &&
        <NavLink to='/Following' exact={true} className='nav-link'>
          <h2>Following</h2>
        </NavLink>}
        {isLoaded && sessionLinks}
    </div>
    <div>
      {sessionUser && <PostCreateForm />}
    </div>
    </div>
  );
}

export default Navigation;
