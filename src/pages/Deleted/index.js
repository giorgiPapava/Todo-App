import React, { useEffect } from 'react'
import { Redirect } from '@reach/router'
import { useSelector } from 'react-redux'

import DeletedTodos from 'components/deletedTodos'
import Loading from 'layout/Loading'

import { selectors } from 'modules/Auth'

function DeletedView() {
  
  const { user, loading } = useSelector(selectors.selectAuth)

  useEffect(() => window.scrollTo(0, 0), [])

  if (!loading && !user.uid) {
    return <Redirect noThrow to='/' />
  } else if (loading) {
    return <Loading />
  }
  return (
    <div
      className='deleted'
      style={{ position: 'relative', minHeight: '100vh' }}
    >
      <DeletedTodos />
    </div>
  )
}


export default DeletedView
