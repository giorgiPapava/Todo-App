import React from 'react';
import { useSelector } from 'react-redux';

import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';

import { selectors as firestoreSelectors } from 'modules/Firestore'
import { selectors as authSelectors } from 'modules/Auth'

import CreateTodo from '../createTodo/CreateTodo';

import './styles.scss';

function TodoHeader({ searchInput, setSearchInput, starred }) {
  const uid = useSelector(authSelectors.selectUid)
  const todos = useSelector(starred ? firestoreSelectors.selectStarredTodos : firestoreSelectors.selectTodos)
  const categories = useSelector(firestoreSelectors.selectCategories)
  
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      )}

      <CreateTodo uid={uid} categories={categories} />
    </div>
  );
}

export default TodoHeader;
