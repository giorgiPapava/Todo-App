import React from 'react';
import 'App.scss';
import { Router } from '@reach/router';
import Navigation from 'components/layout/Navigation';
import Home from 'components/home/Home';
import Todo from 'components/todo/Todo';
import Category from 'components/todo/category/Category';
import SignUp from 'components/auth/SignUp';
import SignIn from 'components/auth/SignIn';
import Star from 'components/star/Star';

function App() {
  return (
    <div className="app">
      <header>
        <Navigation />
      </header>
      <main>
        <Router>
          <Home path="/" />
          <SignUp path="/signup" />
          <SignIn path="/signin" />
          <Todo path="/todo">
            <Category path=":category" />
          </Todo>
          <Star path="/starred" />
        </Router>
      </main>
    </div>
  );
}

export default App;
