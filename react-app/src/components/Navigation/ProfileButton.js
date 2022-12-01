import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <NavLink to='/Following' exact={true} activeClassName='active'>
               Following
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
