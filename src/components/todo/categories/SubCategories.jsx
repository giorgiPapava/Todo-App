import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import CategoryLink from 'utils/CategoryLink';

function SubCategories({ subCategories, categoryID }) {
  return (
    <>
      {subCategories &&
        Object.entries(subCategories).map(([key, subCategory]) => {
          return (
            subCategory &&
            subCategory.categoryID === categoryID && (
              <CategoryLink key={key} to={subCategory.categoryID + '/' + key}>
                {subCategory.subCategoryName}
              </CategoryLink>
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
    },
  ])
)(SubCategories);
