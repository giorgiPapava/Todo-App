import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function CategoryHeader() {
  return (
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
  );
}

export default CategoryHeader;
