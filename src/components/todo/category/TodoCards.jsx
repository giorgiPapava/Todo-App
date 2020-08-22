import React from 'react';
import TodoCard from './TodoCard';
import { connect } from 'react-redux';

function TodoCards({ todos }) {
  return (
    <div className="todo-cards">
      {todos &&
        todos.map((todo) => (
          <TodoCard
            key={todo.id}
            status={todo.status}
            description={todo.description}
            date={todo.date}
          />
        ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
  };
};

export default connect(mapStateToProps)(TodoCards);
