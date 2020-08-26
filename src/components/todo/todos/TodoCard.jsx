import React from 'react';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import Swal from 'sweetalert2';
import { db } from 'config/firebaseConfig';
import swalConfirm from 'utils/swalConfirm';

function TodoCard({ status, description, date, todoID }) {
  const succesFunction = () => {
    return db.collection('todos').doc(todoID).delete();
  };

  const handleDelete = () => {
    swalConfirm('todo', succesFunction);
  };
  return (
    <div className="todo-card">
      <div className="actions">
        <EditIcon />
        <ClearIcon onClick={handleDelete} className="remove" />
      </div>
      <p className="todo-status">{status}</p>
      <h4 className="todo-desc">{description}</h4>
      <span>
        {moment(date.seconds * 1000 + date.nanoseconds).format('lll')}
      </span>
      <button className="todo-done-button">Mark as done</button>
    </div>
  );
}

export default TodoCard;
