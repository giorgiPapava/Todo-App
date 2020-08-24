import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import CategoryLink from 'utils/CategoryLink';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { db } from 'config/firebaseConfig';

function SubCategories({ subCategories, categoryID, categoryName }) {
  let categoryIsEmpty = true;
  subCategories &&
    Object.entries(subCategories).map(([key, subCategory]) => {
      if (subCategory?.categoryID === categoryID) categoryIsEmpty = false;
    });

  const handleSubCategoryDelete = (e) => {
    const subCategoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.subid;

    subCategoryID && db.collection('subCategories').doc(subCategoryID).delete();
  };

  const handleCategoryDelete = (e) => {
    const categoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.categoryid;
    categoryID && db.collection('categories').doc(categoryID).delete();
  };
  return (
    <>
      <div className="categoryNameWrapper" data-categoryid={categoryID}>
        <h3>{categoryName}</h3>
        {categoryIsEmpty && <RemoveCircleIcon onClick={handleCategoryDelete} />}
      </div>

      {subCategories &&
        Object.entries(subCategories).map(([key, subCategory]) => {
          return (
            subCategory &&
            subCategory.categoryID === categoryID && (
              <div className="subcategory-wrapper" data-subid={key}>
                <CategoryLink key={key} to={subCategory.categoryID + '/' + key}>
                  {subCategory.subCategoryName}{' '}
                </CategoryLink>
                <DeleteForeverIcon onClick={handleSubCategoryDelete} />
              </div>
            )
          );
        })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    subCategories: state.firestore.data.subCategories,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'subCategories',
      where: [['userID', '==', props.uid]],
    },
    // {
    //   collection: 'categories',
    //   doc: props.categoryID,
    //   subcollections: [{ collection: 'subCategories' }],
    // },
  ])
)(SubCategories);
