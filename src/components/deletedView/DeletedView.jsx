import React from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';

import DeletedTodos from './deletedTodos/DeletedTodos';
import Loading from 'components/layout/Loading';

function DeletedView({ auth }) {
  if (auth.isLoaded && !auth.uid) {
    return <Redirect noThrow to="/" />;
  } else if (!auth.isLoaded) {
    return <Loading />;
  }
  return (
    <div
      className="deleted"
      style={{ position: 'relative', minHeight: '100vh' }}
    >
      <DeletedTodos uid={auth.uid} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(DeletedView);
