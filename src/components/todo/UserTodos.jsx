import React from 'react';
import TodoHeader from './todos/TodoHeader';
import TodosWrapper from './todos/TodosWrapper';
import CategoryInfo from './todos/CategoryInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

function UserTodos({ todos, subCategoryID }) {
  if (subCategoryID && todos) {
    todos = Object.fromEntries(
      Object.entries(todos).filter(
        ([key, todo]) => subCategoryID === todo.subCategoryID
      )
    );
  }
  return (
    <div className="user-todos">
      <TodoHeader />
      <CategoryInfo />
      <TodosWrapper todos={todos} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    todos: state.firestore.data.todos,
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
