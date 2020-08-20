import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import TodoIcon from '@material-ui/icons/Apps';
import StarIcon from '@material-ui/icons/Star';
import CompletedIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteIcon from '@material-ui/icons/Delete';
import NavLink from 'utils/NavLink';

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <img
          alt="avatar"
          src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
          className="avatar"
        />
        <NavLink to="/">
          <HomeIcon />
        </NavLink>
        <NavLink to="todo/fitness">
          {/* for now it redirects to hard-coded fitness but I want it to redirect to first category*/}
          <TodoIcon />
        </NavLink>
        <NavLink to="starred">
          <StarIcon />
        </NavLink>
        <NavLink to="completed">
          <CompletedIcon />
        </NavLink>
        <NavLink to="deleted">
          <DeleteIcon />
        </NavLink>
      </nav>
    </div>
  );
}

export default Navigation;
