import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
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

import swallSuccess from 'utils/swalSuccess';
import swallFailure from 'utils/swalFailure';

import './styles.scss';

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

function CreateCategory({ categories, userID }) {
  const firestore = useFirestore()
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
    firestore.collection('users')
      .doc(userID)
      .collection('categories')
      .add({
        categoryName: newCategory,
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => createSubCategory(docRef.id));
  };

  const createSubCategory = (newCategoryID) => {
    console.log(category);
    const categoryID = newCategoryID || category;
    if (categoryID) {
      firestore.collection('users')
        .doc(userID)
        .collection('categories')
        .doc(categoryID)
        .collection('subcategories')
        .add({
          subcategoryName: subCategory,
          timestamp: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          swallSuccess('Yor category is created!');
          handleClose();
          setCategory('');
          setSubCategory('');
          setNewCategory('');
        })
        .catch(function (error) {
          swallFailure(error);
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
    var userCategories = Object.values(categories).map((category) => {
      return category && { categoryName: category.categoryName, key: category.id };
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
        className={classes.modal + ' create-category'}
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
              <FormControl
                required
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="category-name-label">Category</InputLabel>
                <Select
                  labelId="category-name-label"
                  id="category-name"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  label="Category"
                >
                  <MenuItem value="create">
                    <em>Create New Category</em>
                  </MenuItem>
                  {userCategories &&
                    userCategories.map((userCategory) => (
                      userCategory && (
                        <MenuItem key={userCategory.key} value={userCategory.key}>
                        {userCategory.categoryName}
                      </MenuItem>
                      )
                    ))}
                </Select>

                {category === 'create' && (
                  <TextField
                    required
                    id="create-category"
                    label="Category Name"
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                  />
                )}

                <TextField
                  required
                  id="subcategory"
                  label="Subcategory Name"
                  value={subCategory}
                  onChange={(event) => setSubCategory(event.target.value)}
                />
              </FormControl>

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
