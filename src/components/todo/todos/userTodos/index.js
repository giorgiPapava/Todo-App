import React, { useState, useMemo } from 'react'
import {} from 'redux'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import TodoHeader from 'components/todo/todos/todoHeader'
import Loading from 'layout/Loading'

import { selectors as firestoreSelectors } from 'modules/Firestore'
import { selectors as authSelectors } from 'modules/Auth'

import './styles.scss'
import sortTodos from 'utils/sortTodos'
import CategoryInfo from '../CategoryInfo'
import TodosWrapper from '../TodosWrapper'

function UserTodos ({ currentStatus, setCurrentStatus, starred }) {
  const subcategory = window.location.pathname.split('/')[3]
  const uid = useSelector(authSelectors.selectUid)
  const todos = useSelector(
    starred
      ? firestoreSelectors.selectStarredTodos
      : firestoreSelectors.selectTodos
  )
  const requesting = useSelector(
    starred
      ? firestoreSelectors.selectRequestingstarredTodos
      : firestoreSelectors.selectRequestingTodos
  )
  useFirestoreConnect([
    {
      collection: 'users',
      doc: uid,
      subcollections: [
        {
          collection: 'todos'
        }
      ],
      storeAs: starred ? 'starredTodos' : 'todos',
      orderBy: 'timestamp'
    }
  ])
  const [searchInput, setSearchInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const userTodos = useMemo(() => {
    if (!todos) {
      return
    }

    const todosBySubcategory = subcategory
      ? sortTodos(todos.filter((todo) => todo.subcategoryID === subcategory))
      : sortTodos(todos)

    const todosBySearch = searchInput
      ? todosBySubcategory.filter(
        (todo) =>
          todo.description &&
            todo.description.toLowerCase().includes(searchInput.toLowerCase())
      )
      : todosBySubcategory

    if (currentStatus === "All Todo's") {
      return todosBySearch
    } else if (currentStatus === 'Completed') {
      return todosBySearch.filter((todo) => todo.status === 'done')
    } else {
      return todosBySearch.filter((todo) => todo.status === 'todo')
    }
  }, [currentStatus, searchInput, subcategory, todos])
  return (
    <div className='wrapper'>
      {requesting && <Loading />}
      <div className='user-todos'>
        <TodoHeader
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          starred={starred}
        />
        {todos ? (
          <>
            <CategoryInfo
              currentStatus={currentStatus}
              setCurrentStatus={setCurrentStatus}
              todosLength={todos && userTodos.length}
            />
            <TodosWrapper
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              todos={todos && userTodos}
              starred={starred}
            />
          </>
        ) : (
          <h2
            style={{
              fontSize: '2.3rem',
              color: 'rgb(72, 57, 70)',
              textAlign: 'center',
              marginTop: '50px'
            }}
          >
            {!requesting && 'Create todos by pressing "Add New Todo" button.'}
          </h2>
        )}
      </div>
    </div>
  )
}

export default UserTodos
