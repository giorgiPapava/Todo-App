import React from 'react';
import 'App.scss';
import { Router } from '@reach/router';
import Navigation from 'components/layout/Navigation';
import Home from 'components/home/Home';
import Todo from 'components/todo/Todo';
import Category from 'components/todo/Category';

function App() {
  return (
    <div className="app">
      <header>
        <Navigation />
      </header>
      <main>
        <Router>
          <Home path="/" />
          <Todo path="/todo">
            <Category path=":category" />
          </Todo>
        </Router>
      </main>
    </div>
  );
}

export default App;
