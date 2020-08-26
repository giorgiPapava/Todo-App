import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import CategoryLink from 'utils/CategoryLink';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { db } from 'config/firebaseConfig';

function SubCategories({ firestore, category, subcategories, categoryID }) {
  let isEmpty =
    firestore.ordered[`${categoryID}-tasks`] && subcategories.length === 0;

  const handleSubCategoryDelete = (e) => {
    const subCategoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.subid;

    subCategoryID &&
      db
        .collection('categories')
        .doc(categoryID)
        .collection('subcategories')
        .doc(subCategoryID)
        .delete();
  };

  const handleCategoryDelete = (e) => {
    const categoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.categoryid;

    categoryID && db.collection('categories').doc(categoryID).delete();
  };
  return (
    <>
      <div className="categoryName-wrapper" data-categoryid={categoryID}>
        <h3>{category.categoryName}</h3>
        {isEmpty && <RemoveCircleIcon onClick={handleCategoryDelete} />}
      </div>

      {subcategories &&
        Object.values(subcategories).map((subcategory) => (
          <div
            className="subcategory-wrapper"
            key={subcategory.id}
            data-subid={subcategory.id}
          >
            <CategoryLink to={categoryID + '/' + subcategory.id}>
              {subcategory.subcategoryName}
            </CategoryLink>
            <DeleteForeverIcon onClick={handleSubCategoryDelete} />
          </div>
        ))}
    </>
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
)(SubCategories);
