import React from 'react';
import 'App.scss';
import { Router } from '@reach/router';
import Navigation from 'components/layout/Navigation';
import Home from 'components/home/Home';
import Todo from 'components/todo/Todo';
import SignUp from 'components/auth/SignUp';
import SignIn from 'components/auth/SignIn';
import DeletedView from 'components/deletedView/DeletedView';

function App() {
  return (
    <div className="app">
      <header>
        <Navigation />
      </header>
      <main>
        <Router primary={false}>
          <Home path="/" />
          <SignUp path="/signup" />
          <SignIn path="/signin" />
          <Todo path="/todo/*" />
          <Todo path="/starred/*" starred={true} />
          <DeletedView path="/deleted" />
        </Router>
      </main>
    </div>
  );
}

export default App;
