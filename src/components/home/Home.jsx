import React from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import { signInWithGoogle, signOut } from 'store/actions/authActions';

import Loading from 'components/layout/Loading';

import 'components/home/Home.scss';

function Home({ firebase, signOut, signInWithGoogle }) {
  if (firebase.auth.isLoaded && !firebase.auth.uid) {
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
            signInWithGoogle();
          }}
          className="google-button"
        >
          Sign In With Google
        </button>
      </div>
    );
  } else if (!firebase.auth.isLoaded) {
    return <Loading />;
  }
  return (
    <div className="Home">
      <h2>
        Welcome back {firebase.auth.displayName || firebase.profile.firstname}
      </h2>
      <p>See your tasks for today.</p>
      <button onClick={() => navigate('/todo')}>Tasks</button>
      <button className="logout-button" onClick={signOut}>
        Log Out
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { firebase: state.firebase };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    signInWithGoogle: () => dispatch(signInWithGoogle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
