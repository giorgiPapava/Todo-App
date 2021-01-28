/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Link } from '@reach/router'
import { motion } from 'framer-motion'

const NavLink = (props) => (
  <motion.div
    animate={{ scale: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.5 }}
  >
    <Link
      {...props}
      getProps={({ isPartiallyCurrent, isCurrent }) => {
        /*
         * the object returned here is passed to the
         * anchor element's props
         */
        return {
          style: {
            color:
              // at active nested todo
              // eslint-disable-next-line no-nested-ternary
              isPartiallyCurrent && props.to.startsWith('todo')
                ? '#ECC927'
                : isCurrent
                  ? '#ECC927'
                  : 'white'
          }
        }
      }}
    />
  </motion.div>
)

export default NavLink
