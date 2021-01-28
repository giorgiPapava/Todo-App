import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import { selectors as firestoreSelectors } from 'modules/Firestore'
import { selectors as authSelectors } from 'modules/Auth'

import DeletedTodo from 'components/deletedTodos/singleDeletedTodo'
import Loading from 'layout/Loading'

import './styles.scss'

function DeletedTodos () {
  const { user } = useSelector(authSelectors.selectAuth)

  const deletedTodos = useSelector(firestoreSelectors.selectDeletedTodos)
  const requesting = useSelector(
    firestoreSelectors.selectRequestingDeletedTodos
  )

  useFirestoreConnect([
    {
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'deleted-todos' }],
      storeAs: 'deletedTodos',
      orderBy: 'timestamp'
    }
  ])

  if (!deletedTodos) {
    return (
      <>
        {requesting && <Loading />}
        <h1
          style={{
            fontSize: '3.2rem',
            textAlign: 'center',
            paddingTop: '30px',
            color: '#483946'
          }}
        >
          No deleted todos!
        </h1>
      </>
    )
  }
  return (
    <>
      {requesting && <Loading />}
      <div className='deleted-todos'>
        {deletedTodos &&
          deletedTodos.map((todo) => (
            <DeletedTodo
              todo={todo}
              key={todo.id}
            />
          ))}
      </div>
    </>
  )
}

export default DeletedTodos
