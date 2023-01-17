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
      <div className='navigation-list'>
        <NavLink activeStyle={{color: "#9e5326",textDecoration:"none"}} exact to="/" className='nav-link'>
          <h2>Recent Posts</h2>
        </NavLink>
        <NavLink activeStyle={{color: "#9e5326",textDecoration:"none"}} to='/Following' exact={true} className='nav-link'>
          <h2>Following</h2>
        </NavLink>
        <PostCreateForm />
        <LogoutButton />
    </div>
    );

  } else {
    sessionLinks = (
      <div>
        <h2>Crumblr is a place to share your photos and experiences with cookies! Browse our recent posts, or sign up to post and follow other users!</h2>
        <div className='navigation-list'>
          <SignUpFormModal />
          <LoginFormModal />
        </div>
      </div>
    );
  }

  return (
    <div className='header'>
      <div className='nav-logo-container'>
        <img className='nav-logo' alt='logo' src={logo}></img>
      </div>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
