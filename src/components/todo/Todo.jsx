import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CategoryLink from 'utils/CategoryLink';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import Loading from 'components/layout/Loading';

function Todo({ children, firebase }) {
  if (firebase.auth.isLoaded && !firebase.auth.uid) {
    return <Redirect noThrow to="/signin" />;
  } else if (!firebase.auth.isLoaded) {
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
        <div className="category-row">
          <h3>Personal</h3>
          <CategoryLink to="fitness">Fitness</CategoryLink>
          <CategoryLink to="health-%26-food-diet">
            Health & food diet
          </CategoryLink>
          <CategoryLink to="meetings">Meetings</CategoryLink>
        </div>

        <div className="category-row">
          <h3>Learning</h3>
          <CategoryLink to="reading">Reading blogs</CategoryLink>
          <CategoryLink to="meetups">Meetups</CategoryLink>
          <CategoryLink to="analysis-design">Analysis Design</CategoryLink>
          <CategoryLink to="design-revisit">Design Revisit</CategoryLink>
        </div>

        <div className="category-row">
          <h3>Project</h3>
          <CategoryLink to="client-calls">Client Calls</CategoryLink>
          <CategoryLink to="pending-works">Pending Works</CategoryLink>
          <CategoryLink to="completed-works">Completed Works</CategoryLink>
        </div>
      </div>

      <div className="todo-main">{children}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { firebase: state.firebase };
};

export default connect(mapStateToProps)(Todo);
