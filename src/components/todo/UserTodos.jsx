import React, { useState, useEffect } from 'react';
import TodoHeader from './todos/TodoHeader';
import TodosWrapper from './todos/TodosWrapper';
import CategoryInfo from './todos/CategoryInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import sortTodos from 'utils/sortTodos';
import './UserTodos.scss';

function UserTodos({
  uid,
  todos,
  subcategoryID,
  categories,
  currentStatus,
  setCurrentStatus,
}) {
  const [filteredTodos, setFilteredTodos] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const [searchedTodos, setSearchedTodos] = useState(null);

  useEffect(() => {
    switch (currentStatus) {
      case "All Todo's":
        setFilteredTodos(null);
        break;

      case 'Upcoming':
        setFilteredTodos(todos.filter((todo) => todo.status === 'todo'));
        break;

      case 'Completed':
        setFilteredTodos(todos.filter((todo) => todo.status === 'done'));
        break;

      default:
        break;
    }
  }, [todos, currentStatus]);

  useEffect(() => {
    if (searchInput && filteredTodos) {
      setSearchedTodos(
        filteredTodos.filter(
          ({ description: todo }) =>
            todo.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
        )
      );
    } else if (searchInput) {
      setSearchedTodos(
        todos.filter(
          ({ description: todo }) =>
            todo.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
        )
      );
    } else {
      setSearchedTodos(null);
    }
  }, [searchInput, filteredTodos, todos]);

  todos = todos && sortTodos(todos);
  if (subcategoryID && todos) {
    todos = Object.values(todos).filter(
      (todo) => todo.subcategoryID === subcategoryID
    );
  }
  return (
    <div className="user-todos">
      <TodoHeader
        todos={todos?.length > 0}
        uid={uid}
        categories={categories}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {todos?.length > 0 && (
        <>
          <CategoryInfo
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            todosLength={
              searchedTodos
                ? searchedTodos.length
                : filteredTodos
                ? filteredTodos.length
                : todos.length
            }
          />
          <TodosWrapper
            todos={searchedTodos || filteredTodos || todos}
            uid={uid}
            categories={categories}
          />
        </>
      )}
    </div>
  );
}

export default compose(
  firestoreConnect((props) => [
    {
      collection: 'users',
      doc: props.uid,
      subcollections: [{ collection: 'todos' }],
      storeAs: `${props.uid}-todos`,
    },
  ]),
  connect(({ firestore }, props) => {
    return {
      todos: firestore.ordered[`${props.uid}-todos`] || [],
      categories: firestore.ordered[`${props.uid}-categories`] || [],
    };
  })
)(UserTodos);
