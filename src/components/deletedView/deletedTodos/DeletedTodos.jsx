import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'recompose';

import DeletedTodo from './DeletedTodo';

import './DeletedTodos.scss';

function DeletedTodos({ deletedTodos, uid }) {
  if (deletedTodos.length === 0) {
    return (
      <h1
        style={{
          fontSize: '3.2rem',
          textAlign: 'center',
          paddingTop: '30px',
          color: '#483946',
        }}
      >
        No deleted todos!
      </h1>
    );
  }
  return (
    <div className="deleted-todos">
      {Object.values(deletedTodos).map((todo) => (
        <DeletedTodo todo={todo} uid={uid} key={todo.id} />
      ))}
    </div>
  );
}

export default compose(
  firestoreConnect((props) => [
    {
      collection: 'users',
      doc: props.uid,
      subcollections: [{ collection: 'deleted-todos' }],
      storeAs: `${props.uid}-deleted-todos`,
    },
  ]),
  connect(({ firestore }, props) => {
    return {
      deletedTodos: firestore.ordered[`${props.uid}-deleted-todos`] || [],
    };
  })
)(DeletedTodos);
