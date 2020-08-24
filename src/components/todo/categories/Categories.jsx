import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import SubCategories from './SubCategories';
import CreateCategory from './CreateCategory';

function Categories({ categories, uid }) {
  return (
    <div className="todo-categories">
      <CreateCategory categories={categories} userID={uid} />

      {categories &&
        Object.entries(categories).map(([key, category]) => {
          return (
            category && (
              <div key={key} className="category-row">
                <h3>{category.categoryName}</h3>
                <SubCategories categoryID={key} />
              </div>
            )
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