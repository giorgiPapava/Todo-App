import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Redirect, Router } from '@reach/router';
import { connect } from 'react-redux';
import Loading from 'components/layout/Loading';
import UserTodos from './userTodos/UserTodos';
import Categories from './categoryies/Categories';

function Todo({ auth }) {
  if (auth.isLoaded && !auth.uid) {
    return <Redirect noThrow to="/signin" />;
  } else if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <div className="todo">
      <div className="todo-categories">
        <div className="add-todo-button">
          <button>
            <AddIcon />
          </button>
        </div>

        <Categories uid={auth.uid} />
      </div>

      <div className="todo-main">
        <Router>
          <UserTodos path="/" uid={auth.uid} />
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Todo);
