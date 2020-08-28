import React from 'react';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { db } from 'config/firebaseConfig';
import swalConfirm from 'utils/swalConfirm';

function TodoCard({ status, description, date, todoID, uid }) {
  const todoDate = new Date(date?.seconds * 1000);
  const hours = todoDate.getHours();
  const minutes = todoDate.getMinutes();

  const succesFunction = () => {
    return db
      .collection('users')
      .doc(uid)
      .collection('todos')
      .doc(todoID)
      .delete();
  };

  const handleDelete = () => {
    swalConfirm('todo', succesFunction);
  };
  return (
    <div className="todo-card">
      <div className="actions">
        {/* <EditIcon /> */}
        <ClearIcon onClick={handleDelete} className="remove" />
      </div>
      <p className="todo-status">{status}</p>
      <h4 className="todo-desc">{description}</h4>
      {date && (
        <span>
          {(todoDate && hours > 0) || minutes > 0
            ? moment(todoDate).format('lll')
            : moment(todoDate).format('ll')}
        </span>
      )}
      <button className="todo-done-button">Mark as done</button>
    </div>
  );
}

export default TodoCard;
