import React from 'react';
import { Redirect, Router } from '@reach/router';
import { connect } from 'react-redux';
import Loading from 'components/layout/Loading';
import Categories from './categories/Categories';
import UserTodos from './UserTodos';

function Todo({ auth }) {
  if (auth.isLoaded && !auth.uid) {
    return <Redirect noThrow to="/signin" />;
  } else if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <div className="todo">
      <Categories uid={auth.uid} />

      <div className="todo-main">
        <Router>
          <UserTodos path="/" uid={auth.uid} />
          <UserTodos path="/:categoryID/:subCategoryID" uid={auth.uid} />
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Todo);
