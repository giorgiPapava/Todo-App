import React from 'react';
import 'App.scss';
import { useSelector } from 'react-redux';
import { Router } from '@reach/router';
import Navigation from 'layout/Navigation';
import Home from 'pages/Home';
import Todo from 'pages/Todo';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import DeletedView from 'pages/Deleted';
import { selectors } from 'modules/Auth';

function App() {
  const { user } = useSelector(selectors.selectAuth)

  return (
    <div className="app">
      { user.uid && (<header>
        <Navigation />
      </header>)
      }
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
