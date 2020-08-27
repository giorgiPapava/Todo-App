import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import PostAddIcon from '@material-ui/icons/PostAdd';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  FormControl,
  MenuItem,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { db } from 'config/firebaseConfig';
import SubcategoriesSelect from './SubcategoriesSelect';
import swallFailure from 'utils/swalFailure';
import swallSuccess from 'utils/swalSuccess';

function CreateTodo({ uid, categories }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [subcategoryID, setSubcategoryID] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDate, setShowDate] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setSelectedDate(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const todoCreateFunction = () => {
    return db
      .collection('todos')
      .add({
        date: showDate && selectedDate,
        description: todoName,
        status: 'todo',
        subcategoryID: subcategoryID,
        userID: uid,
      })
      .then(() => {
        console.log('new todo created');
        handleClose();
        setTodoName('');
        setCategoryID('');
        setSubcategoryID('');
        setSelectedDate(new Date());
        setShowDate(false);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    todoCreateFunction()
      .then(() => swallSuccess('Your todo is created :)'))
      .catch((error) => swallFailure(error));
  };

  return (
    <div className="add-todo">
      <button onClick={handleOpen}>
        <AddIcon /> Add New Todo
      </button>

      <Modal
        aria-labelledby="create-todo"
        aria-describedby="create todo form"
        className={classes.modal + ' create-todo'}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3>Create a New Todo</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                required
                id="todo-name"
                label="Todo name"
                value={todoName}
                onChange={(event) => setTodoName(event.target.value)}
              />

              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <TextField
                  select
                  required
                  variant="filled"
                  labelid="category-name-label"
                  id="category-name"
                  label="Category"
                  value={categoryID}
                  onChange={(event) => setCategoryID(event.target.value)}
                >
                  {categories &&
                    Object.values(categories).map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        <em>{category.categoryName}</em>
                      </MenuItem>
                    ))}
                </TextField>

                {categoryID && (
                  <SubcategoriesSelect
                    categoryID={categoryID}
                    subID={subcategoryID}
                    setSubID={setSubcategoryID}
                  />
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showDate}
                      onChange={() => setShowDate(!showDate)}
                      name="showDate"
                    />
                  }
                  label="Add Dates"
                />

                {showDate && (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className="date-picker">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker (optional)"
                        value={selectedTime}
                        onChange={(date) => {
                          setSelectedDate(
                            new Date(
                              selectedDate.setHours(
                                date.getHours(),
                                date.getMinutes()
                              )
                            )
                          );
                          setSelectedTime(date);
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                )}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                startIcon={<PostAddIcon />}
              >
                Save
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #2831A6',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default CreateTodo;
