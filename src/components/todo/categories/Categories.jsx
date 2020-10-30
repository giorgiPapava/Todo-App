import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import SubCategories from './SubCategories';
import CreateCategory from './CreateCategory';
import './Categories.scss';

function Categories({ categories, uid, showCategories }) {
  // sort categories
  categories =
    categories && categories.slice().sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className={`todo-categories ${showCategories && 'active'}`}>
      <CreateCategory categories={categories} userID={uid} />
      {categories.length > 0 ? (
        Object.values(categories).map((category) => {
          return (
            category && (
              <div key={category.id} className="category-row">
                <SubCategories categoryID={category.id} uid={uid} />
              </div>
            )
          );
        })
      ) : (
        <h2
          style={{
            fontSize: '1.5rem',
            color: 'rgb(72, 57, 70)',
            textAlign: 'center',
            padding: '30px',
          }}
        >
          Start by pressing "+" button to create categories and subcategories.
        </h2>
      )}
    </div>
  );
}

export default compose(
  firestoreConnect((props) => [
    {
      collection: 'users',
      doc: props.uid,
      subcollections: [{ collection: 'categories' }],
      storeAs: `${props.uid}-categories`,
    },
  ]),
  connect(({ firestore }, props) => {
    return {
      categories: firestore.ordered[`${props.uid}-categories`] || [],
    };
  })
)(Categories);
