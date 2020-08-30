import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import './EditTodo.scss';
import SubcategoriesSelect from './createTodo/SubcategoriesSelect';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import swallSuccess from 'utils/swalSuccess';
import swallFailure from 'utils/swalFailure';
import { db } from 'config/firebaseConfig';

function EditTodo({
  open,
  handleClose,
  description,
  categoryID,
  subcategoryID,
  categories,
  date,
  uid,
  todoID,
}) {
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(categoryID);
  const [newSubcategory, setNewSubcategory] = useState(subcategoryID);
  const [showDate, setShowDate] = useState(false);
  const [newDate, setNewDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [newTime, setNewTime] = useState(null);

  const todoEditFunction = () => {
    return db
      .collection('users')
      .doc(uid)
      .collection('todos')
      .doc(todoID)
      .update({
        date: showDate ? newDate : date,
        description: newDescription,
        categoryID: newCategory,
        subcategoryID: newSubcategory,
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    todoEditFunction()
      .then(() => {
        swallSuccess('Your todo is edited :)');
        handleClose();
      })
      .catch((error) => swallFailure(error));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="todo-edit-dialog"
    >
      <form onSubmit={handleEdit}>
        <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to edit your todo. Please take a good look at your
            changes before you submit them.
          </DialogContentText>
          <div className="inputWrapper">
            <TextField
              autoFocus
              margin="dense"
              id="edit-todo-name"
              label="Todo name"
              type="text"
              fullWidth
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
            />
          </div>

          <div className="inputWrapper">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              fullWidth
              labelId="category-select-label"
              id="category-select"
              value={newCategory}
              onChange={(event) => {
                setNewSubcategory('');
                setNewCategory(event.target.value);
              }}
            >
              <MenuItem value="no-category">No category</MenuItem>

              {categories &&
                Object.values(categories).map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
            </Select>
          </div>

          {newCategory !== 'no-category' && (
            <div className="inputWrapper">
              <SubcategoriesSelect
                categoryID={newCategory}
                subID={newSubcategory}
                setSubID={setNewSubcategory}
                variant="standard"
              />
            </div>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={showDate}
                onChange={() => setShowDate(!showDate)}
                name="showDate"
              />
            }
            label="Update Date"
          />

          {showDate && (
            <div className="inputWrapper data-picker">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="none"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  value={newDate}
                  onChange={(date) => setNewDate(date)}
                />
                <KeyboardTimePicker
                  margin="none"
                  id="time-picker"
                  label="Time picker (optional)"
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  value={newTime}
                  onChange={(date) => {
                    if (!date) {
                      newDate && newDate.setHours(0);
                      newDate && newDate.setMinutes(0);
                      setNewDate(newDate);
                    }
                    date &&
                      newDate &&
                      setNewDate(
                        new Date(
                          newDate.setHours(date.getHours(), date.getMinutes())
                        )
                      );
                    setNewTime(date);
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditTodo;
