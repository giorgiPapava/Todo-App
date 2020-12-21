import React, { useState } from 'react'
import todoLogo from 'images/todo_logo.png'
import { TextField, makeStyles, Button } from '@material-ui/core'
import { Link, Redirect } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from 'modules/Auth'
import Loading from 'components/layout/Loading'
import './styles.scss'
import { useEffect } from 'react'

function SignUp() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { user, loading, authError } = useSelector(selectors.selectAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const handleChange = (e) => {
    const input = e.target.id
    if (input === 'email-input') {
      setEmail(e.target.value)
    } else if (input === 'password-input') {
      setPassword(e.target.value)
    } else if (input === 'firstname-input') {
      setFirstname(e.target.value)
    } else if (input === 'lastname-input') {
      setLastname(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      actions.signUp({
        email,
        password,
        firstname,
        lastname
      })
    )
  }

  // cleanup
  useEffect(() => {
    return () => {
      dispatch(actions.resetErrors())
    }
  }, [dispatch])

  if (!loading && user.uid) {
    return <Redirect noThrow to='/' />
  } else if (loading) {
    return <Loading />
  }
  return (
    <div className='sign'>
      <div className='sign-container'>
        <img className='todo-logo' src={todoLogo} alt='todo logo' />
        <h3>Sign Up</h3>
        <p>Hello there! Sign Up and start managing your Todo account</p>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className='sign-fail'>{authError && <p>{authError}</p>}</div>
          <TextField
            required
            id='firstname-input'
            label='First Name'
            value={firstname}
            onChange={handleChange}
          />
          <TextField
            required
            id='lastname-input'
            label='Last Name'
            value={lastname}
            onChange={handleChange}
          />
          <TextField
            required
            id='email-input'
            label='Email'
            value={email}
            onChange={handleChange}
          />
          <TextField
            id='password-input'
            label='Password'
            type='password'
            value={password}
            onChange={handleChange}
            required
          />
          <Button type='submit' variant='contained'>
            Sign Up
          </Button>
        </form>
        <div className='sign-change'>
          <span className='forgot-password-span'>Already have an account?</span>
          <Link to='/signin'>Sign In</Link>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch'
    }
  }
}))

export default SignUp
