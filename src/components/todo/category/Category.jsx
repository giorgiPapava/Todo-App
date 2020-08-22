import React from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryInfo from './CategoryInfo';
import TodoCards from './TodoCards';

function Category({ category }) {
  return (
    <div className="category">
      <CategoryHeader />
      <CategoryInfo category={category} />
      <TodoCards />
    </div>
  );
}

export default Category;
