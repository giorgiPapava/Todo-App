import React from 'react';
import TodoCard from './TodoCard';

function Todos({ todos, categories }) {
  return (
    <div className="todo-cards">
      {todos &&
        Object.values(todos).map((todo) => {
          return (
            <TodoCard
              todoID={todo.id}
              key={todo.id}
              status={todo.status}
              description={todo.description}
              date={todo.date}
            />
          );
        })}
    </div>
  );
}

export default Todos;
