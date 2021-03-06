/* eslint-disable no-nested-ternary */
import React from 'react'

function CategoryInfo ({ currentStatus, setCurrentStatus, todosLength }) {
  const statuses = ['Upcoming', 'Completed', "All Todo's"]

  return (
    <div className='category-info'>
      <h3>
        {todosLength > 0
          ? todosLength > 1
            ? todosLength + ' Todos'
            : '1 Todo'
          : 'No Todos'}
      </h3>
      <div className='todo-status'>
        {statuses.map((status) => (
          <button
            className={status === currentStatus && 'active-status'}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={(event) => setCurrentStatus(event.target.textContent)}
            key={status}
          >
            {status}
          </button>
        ))}
      </div>
      <div className='border-wrapper' />
    </div>
  )
}
export default CategoryInfo
