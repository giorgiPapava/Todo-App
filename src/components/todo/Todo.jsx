import React, { useState } from 'react';
import { Redirect, Router } from '@reach/router';
import { connect } from 'react-redux';
import Loading from 'components/layout/Loading';
import Categories from './categories/Categories';
import UserTodos from './UserTodos';
import './Todo.scss';

function Todo({ auth }) {
  const [showCategories, setShowCategoreis] = useState(true);

  console.log(showCategories);

  if (auth.isLoaded && !auth.uid) {
    return <Redirect noThrow to="/signin" />;
  } else if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <div className={`todo ${showCategories ? 'hidden' : ''}`}>
      <div
        className="burger"
        onClick={() => setShowCategoreis(!showCategories)}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <Categories uid={auth.uid} showCategories={showCategories} />

      <div className={`todo-main ${showCategories ? 'hidden' : ''}`}>
        <Router>
          <UserTodos path="/" uid={auth.uid} />
          <UserTodos path="/:categoryID/:subcategoryID" uid={auth.uid} />
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Todo);
