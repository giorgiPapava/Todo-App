import React from 'react';
import moment from 'moment';

function TodoCard({ status, description, date }) {
  return (
    <div className="todo-card">
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
