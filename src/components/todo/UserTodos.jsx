import React from 'react';
import TodoHeader from './todos/TodoHeader';
import TodosWrapper from './todos/TodosWrapper';
import CategoryInfo from './todos/CategoryInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import sortTodos from 'utils/sortTodos';

function UserTodos({ uid, todos, subcategoryID, categories }) {
  todos = todos && sortTodos(todos);
  if (subcategoryID && todos) {
    todos = Object.values(todos).filter(
      (todo) => todo.subcategoryID === subcategoryID
    );
  }
  return (
    <div className="user-todos">
      <TodoHeader todos={todos?.length > 0} uid={uid} categories={categories} />
      {todos?.length > 0 && (
        <>
          <CategoryInfo />
          <TodosWrapper todos={todos} uid={uid} />
        </>
      )}
    </div>
  );
}

export default compose(
  firestoreConnect((props) => [
    {
      collection: 'users',
      doc: props.uid,
      subcollections: [{ collection: 'todos' }],
      storeAs: `${props.uid}-todos`,
    },
  ]),
  connect(({ firestore }, props) => {
    return {
      todos: firestore.ordered[`${props.uid}-todos`] || [],
      categories: firestore.ordered[`${props.uid}-categories`] || [],
    };
  })
)(UserTodos);
