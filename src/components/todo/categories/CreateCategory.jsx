import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';
import { db } from 'config/firebaseConfig';

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
    border: '2px solid #000',
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

function CreateCategory({ categories, userID }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createCategory = () => {
    db.collection('categories')
      .add({
        categoryName: newCategory,
        userID: userID,
      })
      .then((docRef) => createSubCategory(docRef.id));
  };

  const createSubCategory = (newCategoryID) => {
    const categoryID = newCategoryID || category;
    if (categoryID) {
      db.collection('categories')
        .doc(categoryID)
        .collection('subcategories')
        .add({
          subcategoryName: subCategory,
        })
        .then(() => {
          handleClose();
          setCategory('');
          setSubCategory('');
          setNewCategory('');
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (category === 'create') {
      createCategory();
    } else {
      createSubCategory();
    }
  };

  if (categories) {
    var userCategories = Object.entries(categories).map(([key, category]) => {
      return { categoryName: category.categoryName, key: key };
    });
  }

  return (
    <div>
      <div className="add-todo-button">
        <button type="button" onClick={handleOpen}>
          <AddIcon />
        </button>
      </div>
      <Modal
        aria-labelledby="create-category"
        aria-describedby="create category form"
        className={classes.modal + ' create-caregory'}
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
            <h3>Create Category</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="subcategory"
                label="Subcategory Name"
                value={subCategory}
                onChange={(event) => setSubCategory(event.target.value)}
              />

              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  label="Category"
                >
                  <MenuItem value="create">
                    <em>Create New Category</em>
                  </MenuItem>
                  {userCategories &&
                    userCategories.map((userCategory) => (
                      <MenuItem key={userCategory.key} value={userCategory.key}>
                        {userCategory.categoryName}
                      </MenuItem>
                    ))}
                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>

              {category === 'create' && (
                <TextField
                  required
                  id="create-category"
                  label="Category Name"
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
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

export default CreateCategory;
