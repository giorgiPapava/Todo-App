import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import CreateTodo from './createTodo/CreateTodo';
import './TodoHeader.scss';

function TodoHeader({ uid, categories, todos }) {
  return (
    <div className="todo-header">
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

      <CreateTodo uid={uid} categories={categories} />
    </div>
  );
}

export default TodoHeader;
