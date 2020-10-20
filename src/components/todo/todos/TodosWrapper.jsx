import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import FlipMove from 'react-flip-move';

function Todos({ todos, uid, categories, currentPage, setCurrentPage }) {
  const [todosOnPage, setTodosOnPage] = useState([]);

  useEffect(() => {
    const first = (currentPage - 1) * maxPerPage;
    const last = currentPage * maxPerPage;

    setTodosOnPage(todos.slice(first, last));
  }, [currentPage, todos]);

  const maxPerPage = 6;
  const pages = Math.ceil(todos.length / maxPerPage);

  return (
    <div className="todo-cards">
      {todos.length > maxPerPage && (
        <ul className="todos-pagination">
          {Array.from({ length: pages }, (x, i) => (
            <li
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={i + 1 === currentPage ? 'active' : ''}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      )}

      <FlipMove>
        {todos &&
          Object.values(todosOnPage).map((todo) => {
            return (
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
            );
          })}
      </FlipMove>
    </div>
  );
}

export default Todos;
