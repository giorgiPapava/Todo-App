import React, { useState, useEffect, useCallback } from 'react'
import { Redirect, Router, globalHistory } from '@reach/router'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Loading from 'layout/Loading'
import Categories from 'components/todo/categories'
import UserTodos from 'components/todo/todos/userTodos'
import { useFirestore } from 'react-redux-firebase'
import { selectors as firestoreSelectors } from 'modules/Firestore'
import { selectors as authSelectors } from 'modules/Auth'
import { selectors } from 'modules/Subcategories'

import './styles.scss'

function Todo({ starred }) {
  const [currentStatus, setCurrentStatus] = useState('Upcoming')
  const [showCategories, setShowCategoreis] = useState(false)
  const todos = useSelector(firestoreSelectors.selectTodos)
  const subcategories = useSelector(selectors.selectSubcategories)

  const uid = useSelector(authSelectors.selectUid)
  const loading = useSelector(authSelectors.selectAuthLoading)

  const categories = useSelector(firestoreSelectors.selectCategories)
  const subCategories = useSelector((state) =>
    categories && firestoreSelectors.selectSubCategories(state, categories[0].id)
) 
const firestore = useFirestore()


  useEffect(() => window.scrollTo(0, 0), [])

  useEffect(() => {
    return globalHistory.listen(() => setCurrentStatus('Upcoming'))
  }, [])

  const todoCreateFunction = useCallback((destination, draggableId) => {
    const subcategoryId = subCategories[destination]?.id
    const todo = todos.find((todo) => todo.id === draggableId)
    const subcategoryInfo = subcategories[destination]
    if (!todo || !subcategoryId) return
    return (firestore
      .collection('users')
      .doc(uid)
      .collection('todos')
      .add({
        ...todo,
        categoryId: subcategoryInfo.categoryID,
        subcategoryID: subcategoryInfo.id,
      })
    )
    }, [firestore, subCategories, subcategories, todos, uid])

    const handleDragEnd = useCallback((e) => {
      const { draggableId, destination } = e
      console.log(e)
      if (destination.droppableId !== 'categories') {
        return
      }
      todoCreateFunction(destination.index - 1, draggableId)
    }, [todoCreateFunction])
  
  if (!loading && !uid) {
    return <Redirect noThrow to='/' />
  } else if (loading) {
    return <Loading />
  }


  return (
    <DragDropContext onDragEnd={handleDragEnd} isDragDisabled>
      <div className={`todo ${showCategories ? 'hidden' : ''}`}>
        {!starred && (
          <>
            <div
              className='burger'
              onClick={() => setShowCategoreis(!showCategories)}
            >
              <div className='line1'></div>
              <div className='line2'></div>
              <div className='line3'></div>
            </div>
            <Droppable droppableId='categories'>
              {(provided, snapshot) => (
                <>
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Categories
                      showCategories={showCategories}
                      provided={provided}
                    />
                  </div>
                  <span
                    style={{
                      display: 'none'
                    }}
                  >
                    {provided.placeholder}
                  </span>
                </>
              )}
            </Droppable>
          </>
        )}
        <Droppable droppableId='todos'>
          {(provided, snapshot) => (
            <div
              className={`todo-main ${showCategories ? 'hidden' : ''}`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Router>
                <UserTodos
                  path='/'
                  currentStatus={currentStatus}
                  setCurrentStatus={setCurrentStatus}
                  starred={starred}
                  provided={provided}
                />
                <UserTodos
                  path='/:categoryID/:subcategoryID'
                  currentStatus={currentStatus}
                  setCurrentStatus={setCurrentStatus}
                  provided={provided}
                />
              </Router>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default Todo
