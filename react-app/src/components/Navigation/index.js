import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from "../auth/LogoutButton";
import PostCreateForm from '../Posts/CreatePost';
import LoginFormModal from '../auth/LoginFormModal';
import './Navigation.css';

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
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className='header'>
    <div className='navigation-list'>
        <NavLink exact to="/" className='nav-link'>
          <h2 >Recent Posts</h2>
        </NavLink>
        {sessionUser &&
        <NavLink to='/Following' exact={true} className='nav-link'>
          <h2 >Following</h2>
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
