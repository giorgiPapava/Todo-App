import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { selectors as firestoreSelectors } from 'modules/Firestore'
import { selectors as authSelectors } from 'modules/Auth'

function Todos({ todos, starred, currentPage, setCurrentPage, provided }) {
  const [todosOnPage, setTodosOnPage] = useState([])
  const uid = useSelector(authSelectors.selectUid)
  const categories = useSelector(firestoreSelectors.selectCategories)

  useEffect(() => {
    const first = (currentPage - 1) * maxPerPage
    const last = currentPage * maxPerPage

    setTodosOnPage(todos.slice(first, last))
  }, [currentPage, todos])

  const maxPerPage = 6
  const pages = Math.ceil(todos.length / maxPerPage)

  return (
    <div className='todo-cards'>
      {todos.length > maxPerPage && (
        <ul className='todos-pagination'>
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
      
        {todos && (
          <ul
            className='todos'
          >
            {Object.values(todosOnPage).map((todo, index) => {
              return (
                <Draggable id={todo.id} draggableId={todo.id} index={index} key={todo.id}>
                {(provided, snapshot) => (
                  <TodoCard
                  snapshot={snapshot}
                  provided={provided}
                  todoID={todo.id}
                  status={todo.status}
                  description={todo.description}
                  date={todo.date}
                  categoryID={todo.categoryID}
                  subcategoryID={todo.subcategoryID}
                  timestamp={todo.timestamp}
                  uid={uid}
                  categories={categories}
                  starred={todo.starred}
                />
                )}
                </Draggable>
              )
            })}
          </ul>
        )}
    </div>
  )
}

export default Todos
