import React, { useState, useEffect } from 'react';
import { Redirect, Router, globalHistory } from '@reach/router';
import { connect } from 'react-redux';
import Loading from 'components/layout/Loading';
import Categories from './categories/Categories';
import UserTodos from './UserTodos';
import './Todo.scss';

function Todo({ auth, starred }) {
  const [currentStatus, setCurrentStatus] = useState("All Todo's");
  const [showCategories, setShowCategoreis] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    return globalHistory.listen(() => setCurrentStatus("All Todo's"));
  }, []);

  if (auth.isLoaded && !auth.uid) {
    return <Redirect noThrow to="/" />;
  } else if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <div className={`todo ${showCategories ? 'hidden' : ''}`}>
      {!starred && (
        <>
          <div
            className="burger"
            onClick={() => setShowCategoreis(!showCategories)}
          >
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
          <Categories uid={auth.uid} showCategories={showCategories} />
        </>
      )}

      <div className={`todo-main ${showCategories ? 'hidden' : ''}`}>
        <Router>
          <UserTodos
            path="/"
            uid={auth.uid}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            starred={starred}
          />
          <UserTodos
            path="/:categoryID/:subcategoryID"
            uid={auth.uid}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Todo);
