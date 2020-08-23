import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import SubCategories from './SubCategories';

function Categories({ categories }) {
  return (
    <div>
      {categories &&
        Object.entries(categories).map(([key, category]) => {
          return (
            <div key={key} className="category-row">
              <h3>{category.categoryName}</h3>
              <SubCategories categoryID={key} />
            </div>
          );
        })}
    </div>
    // <div className="category-row">
    //   {/* <CategoryLink to="/todo">All Todos</CategoryLink> */}
    // </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.firestore.data.categories,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'categories',
      where: [['userID', '==', props.uid]],
    },
  ])
)(Categories);
