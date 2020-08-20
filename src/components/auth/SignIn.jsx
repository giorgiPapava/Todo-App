import React from 'react';
import todoLogo from 'images/todo_logo.png';
import { TextField, makeStyles, Button } from '@material-ui/core';
import { Link } from '@reach/router';

function SignUp() {
  const classes = useStyles();

  return (
    <div className="sign">
      <div className="sign-container">
        <img className="todo-logo" src={todoLogo} alt="todo logo" />
        <h3>Sign In</h3>
        <p>Hello there! Sign In and start managing your Todo account</p>
        <form className={classes.root}>
          <TextField required id="standard-required" label="Email" />
          <TextField
            id="password-input"
            label="Password"
            type="password"
            required
          />
          <Button variant="contained">Sign In</Button>
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

export default SignUp;
