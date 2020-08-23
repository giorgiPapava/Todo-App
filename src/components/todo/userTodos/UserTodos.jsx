import React from 'react';
import TodoHeader from './TodoHeader';
import Todos from './Todos';
import CategoryInfo from './CategoryInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

function UserTodos({ todos }) {
  return (
    <div className="user-todos">
      <TodoHeader />
      <CategoryInfo />
      <Todos todos={todos} />
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
