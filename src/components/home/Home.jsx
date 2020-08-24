import React from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { signOut } from 'store/actions/authActions';
import Loading from 'components/layout/Loading';

function Home({ firebase, signOut }) {
  if (firebase.auth.isLoaded && !firebase.auth.uid) {
    return <Redirect noThrow to="signin" />;
  } else if (!firebase.auth.isLoaded) {
    return <Loading />;
  }
  return (
    <div className="Home">
      <h2>Welcome back {firebase.profile.firstname}</h2>
      <button onClick={signOut}>Log Out</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { firebase: state.firebase };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
