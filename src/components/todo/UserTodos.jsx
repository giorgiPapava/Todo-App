import React from 'react';
import TodoHeader from './todos/TodoHeader';
import TodosWrapper from './todos/TodosWrapper';
import CategoryInfo from './todos/CategoryInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

function UserTodos({ uid, todos, subcategoryID, categories }) {
  if (subcategoryID && todos) {
    todos = Object.values(todos).filter(
      (todo) => todo.subcategoryID === subcategoryID
    );
  }
  return (
    <div className="user-todos">
      <TodoHeader todos={todos?.length > 0} uid={uid} />
      {todos?.length > 0 && (
        <>
          <CategoryInfo />
          <TodosWrapper todos={todos} />
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    todos: state.firestore.ordered.todos,
    categories: state.firestore.ordered.categories,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'todos',
      where: [['userID', '==', props.uid]],
    },
  ])
)(UserTodos);
