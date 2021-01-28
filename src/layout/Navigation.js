import React from 'react'

import HomeIcon from '@material-ui/icons/Home'
import TodoIcon from '@material-ui/icons/Apps'
import StarIcon from '@material-ui/icons/Star'
import DeleteIcon from '@material-ui/icons/Delete'
import NavLink from 'utils/NavLink'
import './Navigation.scss'
import todoLogo from 'images/todo.jpg'
import { motion } from 'framer-motion'

function Navigation () {
  return (
    <div className='navigation'>
      <div className='nav-wrapper'>
        <nav>
          <motion.div
            whileHover={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 0, 360, 360, 0]
            }}
            transition={{ duration: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              // eslint-disable-next-line react/jsx-no-bind
              onDragStart={(e) => {
                e.preventDefault()
              }}
              alt='avatar'
              src={todoLogo}
              className='avatar'
            />
          </motion.div>
          <NavLink to='/'>
            <HomeIcon />
          </NavLink>
          <NavLink to='todo'>
            <TodoIcon />
          </NavLink>
          <NavLink to='starred'>
            <StarIcon />
          </NavLink>
          <NavLink to='deleted'>
            <DeleteIcon />
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Navigation
