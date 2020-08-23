import React from 'react';
import TodoCard from './TodoCard';

function Todos({ todos }) {
  return (
    <div className="todo-cards">
      {todos &&
        Object.entries(todos).map(([key, todo]) => {
          console.log(todo);
          return (
            <TodoCard
              key={key}
              status={todo.status}
              description={todo.description}
              date={todo.date}
            />
          );
        })}
      {/* {todos &&
        todos.map((todo) => (
          <TodoCard
            key={todo.id}
            status={todo.status}
            description={todo.description}
            date={todo.date}
          />
        ))} */}
    </div>
  );
}

export default Todos;
