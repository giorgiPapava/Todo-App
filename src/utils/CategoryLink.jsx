import React from 'react'
import { Link } from '@reach/router'
import { motion } from 'framer-motion'

const CategoryLink = (props) => (
  <motion.div
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        /*
         * the object returned here is passed to the
         * anchor element's props
         */
        return {
          style: {
            color: isCurrent ? 'rgb(0, 125, 255)' : 'black'
          }
        }
      }}
    />
  </motion.div>
)

export default CategoryLink
