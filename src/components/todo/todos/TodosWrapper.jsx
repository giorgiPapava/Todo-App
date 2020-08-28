import React from 'react';
import TodoCard from './TodoCard';

function Todos({ todos, uid }) {
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
              uid={uid}
            />
          );
        })}
    </div>
  );
}

export default Todos;
