import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import SubCategories from 'components/todo/subCategories';
import CreateCategory from 'components/todo/createCategories';
import Loading from 'layout/Loading'

import { selectors as authSelectors } from 'modules/Auth';
import { selectors as firestoreSelectors } from 'modules/Firestore'

import './styles.scss';

function Categories({ showCategories }) {
  const uid = useSelector(authSelectors.selectUid)
  const categories = useSelector(firestoreSelectors.selectCategories)
  const requesting = useSelector(
    firestoreSelectors.selectRequestingCategories
  )
  useFirestoreConnect([
    {
      collection: 'users',
      doc: uid,
      subcollections: [{ collection: 'categories' }],
      storeAs: 'categories',
      orderBy: 'timestamp'
    }
  ])

  return (
    <div className={`todo-categories ${showCategories && 'active'}`}>
      {requesting && <Loading />}
      <CreateCategory categories={categories} userID={uid} />
      {categories ? (
        categories.map((category) => {
          return (
            category && (
              <div key={category.id} className="category-row">
                <SubCategories categoryID={category.id} />
              </div>
            )
          );
        })
      ) : (
          !requesting && <h2
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

export default Categories
