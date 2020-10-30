import React from 'react';
import moment from 'moment';
import { db } from 'config/firebaseConfig';

import RestoreIcon from '@material-ui/icons/Restore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function DeletedTodo({ todo, uid }) {
  const todoDate = new Date(todo.timestamp?.seconds * 1000);
  const hours = todoDate.getHours();
  const minutes = todoDate.getMinutes();

  const restoreTodo = () => {
    db.collection('users')
      .doc(uid)
      .collection('todos')
      .doc(todo.id)
      .set({
        categoryID: todo.categoryID,
        date: todo.date,
        description: todo.description,
        status: todo.status,
        subcategoryID: todo.subcategoryID || '',
        timestamp: todo.timestamp,
        starred: todo.starred || false,
      })
      .then(() => {
        db.collection('users')
          .doc(uid)
          .collection('deleted-todos')
          .doc(todo.id)
          .delete();
      });
  };

  const permanentDeleteTodo = () => {
    db.collection('users')
      .doc(uid)
      .collection('deleted-todos')
      .doc(todo.id)
      .delete();
  };
  return (
    <div className="todo">
      <p>{todo.description}</p>
      <div className="buttons">
        <button onClick={restoreTodo}>
          Restore <RestoreIcon />
        </button>
        <button onClick={permanentDeleteTodo}>
          Delete <DeleteForeverIcon />
        </button>
      </div>
      <span>
        {(todoDate && hours > 0) || minutes > 0
          ? moment(todoDate).format('lll')
          : moment(todoDate).format('ll')}
      </span>
    </div>
  );
}

export default DeletedTodo;
