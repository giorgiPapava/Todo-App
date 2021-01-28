/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { compose } from 'recompose'
import { connect, useSelector } from 'react-redux'
import { TextField, MenuItem } from '@material-ui/core'
import { selectors as firestoreSelectors } from 'modules/Firestore'

function SubcategoriesSelect ({ subID, setSubID, variant, categoryID }) {
  const subcategories = useSelector((state) =>
    firestoreSelectors.selectSubCategories(state, categoryID)
  )
  return (
    <TextField
      fullWidth
      select
      required
      variant={variant || 'filled'}
      labelid='subcategory-name-label'
      id='subcategory-name'
      label='Subcategory'
      value={subID}
      onChange={(event) => setSubID(event.target.value)}
    >
      {subcategories &&
        Object.values(subcategories).map((subcategory) => (
          <MenuItem
            value={subcategory.id}
            id={subcategory.id}
            key={subcategory.id}
          >
            <em>{subcategory.subcategoryName}</em>
          </MenuItem>
        ))}
    </TextField>
  )
}

export default compose(
  connect(({ firestore }, props) => {
    return {
      subcategories:
        firestore.ordered[`${props.categoryID}-subcategories`] || []
    }
  })
)(SubcategoriesSelect)
