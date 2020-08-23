import React from 'react';

function TodoCard({ status, description, date }) {
  return (
    <div className="todo-card">
      <p className="todo-status">{status}</p>
      <h4 className="todo-desc">{description}</h4>
      <span>{date}</span>
      <button className="todo-done-button">Mark as done</button>
    </div>
  );
}

export default TodoCard;
