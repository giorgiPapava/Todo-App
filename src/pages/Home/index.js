import React from 'react';
import { navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

import { actions as authActions, selectors } from 'modules/Auth';
import Loading from 'components/layout/Loading';

import 'pages/Home/styles.scss';

function Home() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(selectors.selectAuth)
  if (!loading && !user.uid) {
    return (
      <div className="Home">
        <h2>You are not authorized</h2>
        <p>To view and create your tasks please Sign in or Sign Up</p>
        <div className="sign-buttons">
          <button onClick={() => navigate('/signin')}>Sign In</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
        <button
          onClick={() => {
            dispatch(authActions.signInWithGoogle())
          }}
          className="google-button"
        >
          Sign In With Google
        </button>
      </div>
    );
  } else if (loading) {
    return <Loading />;
  }
  return (
    <div className="Home">
      <h2>
        Welcome back {user.displayName}
      </h2>
      <p>See your tasks for today.</p>
      <button onClick={() => navigate('/todo')}>Tasks</button>
      <button className="logout-button" onClick={() => dispatch(authActions.signOut())}>
        Log Out
      </button>
    </div>
  );
}

export default Home;
