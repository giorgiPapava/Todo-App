import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Redirect, Router } from '@reach/router';
import { connect } from 'react-redux';
import Loading from 'components/layout/Loading';
import { db } from 'config/firebaseConfig';
import UserTodos from './userTodos/UserTodos';
import CategoryLink from 'utils/CategoryLink';

function Todo({ auth }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    // get user categories
    try {
      db.collection('categories').onSnapshot((snapshot) =>
        setCategories(
          snapshot.docs
            .filter((doc) => doc.data().userID === auth.uid)
            .map((doc) => ({
              categoryID: doc.id,
              categoryName: doc.data().categoryName,
            }))
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, [auth.uid]);

  useEffect(() => {
    // get user subcategories
    try {
      db.collection('subCategories').onSnapshot((snapshot) => {
        setSubCategories(
          snapshot.docs
            .filter((doc) => {
              return categories
                .map((obj) => obj.categoryID)
                .includes(doc.data().categoryID);
            })
            .map((doc) => ({
              subCategoryName: doc.data().subCategoryName,
              categoryID: doc.data().categoryID,
              subCategoryID: doc.id,
            }))
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [auth.uid, categories]);

  console.log('categories => ', categories);
  console.log('subCategories => ', subCategories);

  if (auth.isLoaded && !auth.uid) {
    return <Redirect noThrow to="/signin" />;
  } else if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <div className="todo">
      <div className="todo-categories">
        <div className="add-todo-button">
          <button>
            <AddIcon />
          </button>
        </div>

        <div className="category-row">
          <CategoryLink to="/todo">All Todos</CategoryLink>
        </div>
        {categories.map((category) => (
          <div className="category-row" key={category.categoryID}>
            <h3>{category.categoryName}</h3>
            {subCategories
              .filter(
                (subCategory) => subCategory.categoryID === category.categoryID
              )
              .map((subCategory) => (
                <CategoryLink
                  to={`${subCategory.categoryID}/${subCategory.subCategoryID}`}
                >
                  {subCategory.subCategoryName}
                </CategoryLink>
              ))}
          </div>
        ))}
      </div>

      <div className="todo-main">
        <Router>
          <UserTodos path="/" />
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Todo);
