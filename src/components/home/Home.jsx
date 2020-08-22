import React from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { signOut } from 'store/actions/authActions';

function Home({ firebase, signOut }) {
  if (firebase.auth.isLoaded && !firebase.auth.uid) {
    return <Redirect noThrow to="signin" />;
  } else if (!firebase.auth.isLoaded) {
    return (
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return (
    <div className="Home">
      <button onClick={signOut}>Log Out</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return { firebase: state.firebase };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
