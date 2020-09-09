import React from 'react';
import TodoCard from './TodoCard';
import FlipMove from 'react-flip-move';

function Todos({ todos, uid, categories }) {
  return (
    <div className="todo-cards">
      {todos &&
        Object.values(todos).map((todo) => {
          return (
            <FlipMove>
              <TodoCard
                todoID={todo.id}
                key={todo.id}
                status={todo.status}
                description={todo.description}
                date={todo.date}
                categoryID={todo.categoryID}
                subcategoryID={todo.subcategoryID}
                uid={uid}
                categories={categories}
              />
            </FlipMove>
          );
        })}
    </div>
  );
}

export default Todos;
