import React from 'react';
import TodoHeader from './TodoHeader';
import Todos from './Todos';
import CategoryInfo from './CategoryInfo';

function UserTodos() {
  return (
    <div className="user-todos">
      <TodoHeader />
      <CategoryInfo />
      <Todos />
    </div>
  );
}

export default UserTodos;
