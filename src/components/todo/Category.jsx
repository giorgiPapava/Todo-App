import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function Category({ category }) {
  return (
    <div className="category">
      <div className="category-header">
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

      <div className="category-info">
        <h3>{getCategoryTitle(category)}</h3>
        <div className="todo-status">
          <button className="active">All Todo's</button>
          <button>Upcoming</button>
          <button>Completed</button>
          <button>Others</button>
        </div>
        <div className="border-wrapper"></div>
      </div>
    </div>
  );
}

const getCategoryTitle = (categoryTitle) => {
  let words = categoryTitle.split('-');
  let upperCase = words.map((word) =>
    word === '%26' ? '&' : word.slice(0, 1).toUpperCase().concat(word.slice(1))
  );
  return upperCase.join(' ');
};

export default Category;
