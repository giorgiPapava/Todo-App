import React from 'react';
import { compose } from 'recompose';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { TextField, MenuItem } from '@material-ui/core';

function SubcategoriesSelect({ subID, setSubID, subcategories }) {
  return (
    <TextField
      select
      required
      variant="filled"
      labelid="subcategory-name-label"
      id="subcategory-name"
      label="Subcategory"
      value={subID}
      onChange={(event) => setSubID(event.target.value)}
    >
      {subcategories &&
        Object.values(subcategories).map((subcategory) => (
          <MenuItem value={subcategory.id} id={subcategory.id}>
            <em>{subcategory.subcategoryName}</em>
          </MenuItem>
        ))}
    </TextField>
  );
}

export default compose(
  firestoreConnect((props) => {
    return [
      {
        collection: 'categories',
        doc: props.categoryID,
        subcollections: [{ collection: 'subcategories' }],
        storeAs: `${props.categoryID}-tasks`,
      },
    ];
  }),
  connect(({ firestore }, props) => {
    return {
      category: firestore.data.categories[props.categoryID],
      subcategories: firestore.ordered[`${props.categoryID}-tasks`] || [],
      firestore: firestore,
    };
  })
)(SubcategoriesSelect);
