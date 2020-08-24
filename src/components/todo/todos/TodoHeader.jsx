import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function UserTodoHeader() {
  return (
    <div className="userTodo-header">
      <div className="search">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search Here"
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>

      <div className="add-todo">
        <button>
          <AddIcon /> Add New Todo
        </button>
      </div>
    </div>
  );
}

export default UserTodoHeader;
