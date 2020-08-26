import React, { useState } from 'react';
import todoLogo from 'images/todo_logo.png';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { Link, Redirect } from '@reach/router';
import { signIn } from 'store/actions/authActions';
import { connect } from 'react-redux';
import Loading from 'components/layout/Loading';
import swallSuccess from 'utils/swalSuccess';

function SignIn({ signIn, authError, firebase }) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const input = e.target.id;
    if (input === 'email-input') {
      setEmail(e.target.value);
    } else if (input === 'password-input') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  if (firebase.auth.isLoaded && firebase.auth.uid) {
    return <Redirect noThrow to="/" />;
  } else if (!firebase.auth.isLoaded) {
    return <Loading />;
  }
  return (
    <div className="sign">
      <div className="sign-container">
        <img className="todo-logo" src={todoLogo} alt="todo logo" />
        <h3>Sign In</h3>
        <p>Hello there! Sign In and start managing your Todo account</p>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className="sign-fail">{authError && <p>{authError}</p>}</div>
          <TextField
            required
            id="email-input"
            label="Email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            id="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </form>
        <div className="sign-change">
          <span className="forgot-password-span">Don't have an account?</span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
