import React from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryInfo from './CategoryInfo';

function Category({ category }) {
  return (
    <div className="category">
      <CategoryHeader />
      <CategoryInfo category={category} />
    </div>
  );
}

export default Category;
