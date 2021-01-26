import React, { useCallback } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { selectors as authSelectors } from 'modules/Auth'
import swalConfirm from 'utils/swalConfirm';

function DeletedTodo({ todo }) {
  const firestore = useFirestore()

  const todoDate = new Date(todo.timestamp?.seconds * 1000);
  const hours = todoDate.getHours();
  const minutes = todoDate.getMinutes();

  const uid = useSelector(authSelectors.selectUid)
  const restoreTodo = () => {
    firestore.collection('users')
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
        firestore.collection('users')
          .doc(uid)
          .collection('deleted-todos')
          .doc(todo.id)
          .delete();
      });
  };

    const permanentDeleteTodo = useCallback(() => {
      return firestore.collection('users')
        .doc(uid)
        .collection('deleted-todos')
        .doc(todo.id)
        .delete();
    }, [firestore, todo.id, uid])

  const handleDelete = useCallback(() => {
    swalConfirm('todo', permanentDeleteTodo);
  }, [permanentDeleteTodo])

  return (
    <div className="todo">
      <p>{todo.description}</p>
      <div className="buttons">
        <button onClick={restoreTodo}>
          Restore <RestoreIcon />
        </button>
        <button onClick={handleDelete}>
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
