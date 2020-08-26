import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import CreateTodo from './createTodo/CreateTodo';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

function UserTodoHeader({ uid, categories, todos }) {
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

const mapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'categories',
      where: [['userID', '==', props.uid]],
    },
  ])
)(UserTodoHeader);
