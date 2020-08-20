import React from 'react';
import TodoCard from './TodoCard';

function TodoCards() {
  return (
    <div className="todo-cards">
      <TodoCard
        status="done"
        description="Add eggs & breads for preferably breakfeast"
        date="21 April, 2020"
      />
      <TodoCard
        status="TODO"
        description="Go gym"
        date="21 April, 2020 at 4.00am"
      />
      <TodoCard
        status="TODO"
        description="Drink 3 liters water enough a day"
        date="21 April, 2020 at 6.20am"
      />
      <TodoCard status="TODO" description="Learn React" date="21 April, 2020" />
      <TodoCard
        status="TODO"
        description="Start working"
        date="21 April, 2020"
      />
    </div>
  );
}

export default TodoCards;
