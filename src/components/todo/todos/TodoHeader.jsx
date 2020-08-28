import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import CreateTodo from './createTodo/CreateTodo';

function TodoHeader({ uid, categories, todos }) {
  return (
    <div className="userTodo-header">
      {todos && (
        <div className="search">
          <div className="searchIcon">
            <SearchIcon />
          </div>

          <InputBase
            placeholder="Search Here"
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      )}

      {categories?.length > 0 && (
        <CreateTodo uid={uid} categories={categories} />
      )}
    </div>
  );
}

export default TodoHeader;
