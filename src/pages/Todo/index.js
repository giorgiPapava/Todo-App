import React, { useState, useEffect } from 'react';
import { Redirect, Router, globalHistory } from '@reach/router';
import { useSelector } from 'react-redux';

import Loading from 'layout/Loading';
import Categories from 'components/todo/categories';
import UserTodos from 'components/todo/UserTodos';

import { selectors as authSelectors } from 'modules/Auth';

import './styles.scss';

function Todo({ starred }) {
  const [currentStatus, setCurrentStatus] = useState("All Todo's");
  const [showCategories, setShowCategoreis] = useState(false);

  const uid = useSelector(authSelectors.selectUid)
  const loading = useSelector(authSelectors.selectAuthLoading)

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    return globalHistory.listen(() => setCurrentStatus("All Todo's"));
  }, []);

  if (!loading && !uid) {
    return <Redirect noThrow to="/" />;
  } else if (loading) {
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
          <Categories showCategories={showCategories} />
        </>
      )}

      <div className={`todo-main ${showCategories ? 'hidden' : ''}`}>
        <Router>
          <UserTodos
            path="/"
            uid={uid}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            starred={starred}
          />
          <UserTodos
            path="/:categoryID/:subcategoryID"
            uid={uid}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />
        </Router>
      </div>
    </div>
  );
}

export default Todo
