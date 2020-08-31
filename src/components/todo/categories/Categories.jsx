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
      {categories &&
        Object.values(categories).map((category) => {
          return (
            category && (
              <div key={category.id} className="category-row">
                <SubCategories categoryID={category.id} uid={uid} />
              </div>
            )
          );
        })}
      {categories &&
        Object.values(categories).map((category) => {
          return (
            category && (
              <div key={category.id} className="category-row">
                <SubCategories categoryID={category.id} uid={uid} />
              </div>
            )
          );
        })}{' '}
      {categories &&
        Object.values(categories).map((category) => {
          return (
            category && (
              <div key={category.id} className="category-row">
                <SubCategories categoryID={category.id} uid={uid} />
              </div>
            )
          );
        })}
      {categories &&
        Object.values(categories).map((category) => {
          return (
            category && (
              <div key={category.id} className="category-row">
                <SubCategories categoryID={category.id} uid={uid} />
              </div>
            )
          );
        })}
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
