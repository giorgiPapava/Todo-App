import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import CategoryLink from 'utils/CategoryLink';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { db } from 'config/firebaseConfig';
import swalConfirm from 'utils/swalConfirm';
import { motion } from 'framer-motion';

function SubCategories({
  firestore,
  category,
  subcategories,
  categoryID,
  uid,
}) {
  // sort subcategories
  subcategories =
    subcategories &&
    subcategories.slice().sort((a, b) => a.timestamp - b.timestamp);

  let isEmpty =
    firestore.ordered[`${categoryID}-subcategories`] &&
    subcategories.length === 0;

  const subcategoryDeleteFunction = (subCategoryID) => {
    return db
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryID)
      .collection('subcategories')
      .doc(subCategoryID)
      .delete();
  };

  const categoryDeleteFunction = (categoryID) => {
    return db
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryID)
      .delete();
  };

  const handleSubCategoryDelete = (e) => {
    const subCategoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.subid;

    subCategoryID &&
      swalConfirm('subcategory', subcategoryDeleteFunction, subCategoryID);
  };

  const handleCategoryDelete = (e) => {
    const categoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.categoryid;

    categoryID && swalConfirm('category', categoryDeleteFunction, categoryID);
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
        collection: 'users',
        doc: props.uid,
        subcollections: [
          { collection: 'categories', doc: props.categoryID },
          { collection: 'subcategories' },
        ],
        storeAs: `${props.categoryID}-subcategories`,
      },
    ];
  }),
  connect(({ firestore }, props) => {
    return {
      category: firestore.data[`${props.uid}-categories`][props.categoryID],
      subcategories:
        firestore.ordered[`${props.categoryID}-subcategories`] || [],
      firestore: firestore,
    };
  })
)(SubCategories);
