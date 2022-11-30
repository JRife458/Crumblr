
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionState = useSelector((state) => state.session)
  const sessionUser = sessionState.user
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!sessionUser &&
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>}
        {!sessionUser &&
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>}
        {sessionUser &&
        <li>
          <NavLink to='/Following' exact={true} activeClassName='active'>
            Following
          </NavLink>
        </li>}
       {sessionUser &&
        <li>
          <LogoutButton />
        </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
