import React, { useMemo } from 'react'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Loading from 'layout/Loading'

import CategoryLink from 'utils/CategoryLink'
import swalConfirm from 'utils/swalConfirm'

import { selectors as authSelectors } from 'modules/Auth'
import { selectors as firestoreSelectors } from 'modules/Firestore'
import { Draggable } from 'react-beautiful-dnd'
import { actions, selectors } from 'modules/Subcategories'
function SubCategories({ categoryID, parentIndex }) {
  const firestore = useFirestore()
  const dispatch = useDispatch()

  const subcategories = useSelector(selectors.selectSubcategories)

  const uid = useSelector(authSelectors.selectUid)
  const categories = useSelector(firestoreSelectors.selectCategories)

  const subCategories = useSelector((state) =>
    firestoreSelectors.selectSubCategories(state, categoryID)
  )
  const requesting = useSelector((state) =>
    firestoreSelectors.selectRequestingSubCategories(state, categoryID)
  )

  const category = useMemo(
    () => categories.find((category) => category.id === categoryID),
    [categories, categoryID]
  )

  useFirestoreConnect([
    {
      collection: 'users',
      doc: uid,
      subcollections: [
        { collection: 'categories', doc: categoryID },
        { collection: 'subcategories' }
      ],
      storeAs: `subcategory-${categoryID}`,
      orderBy: 'timestamp'
    }
  ])

  const subcategoryDeleteFunction = (subCategoryID) => {
    return firestore
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryID)
      .collection('subcategories')
      .doc(subCategoryID)
      .delete()
  }

  const categoryDeleteFunction = (categoryID) => {
    return firestore
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(categoryID)
      .delete()
  }

  const handleSubCategoryDelete = (e) => {
    const subCategoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.subid

    subCategoryID &&
      swalConfirm('subcategory', subcategoryDeleteFunction, subCategoryID)
  }

  const handleCategoryDelete = (e) => {
    const categoryID =
      e.target.parentNode.dataset.subid ||
      e.target.parentNode.parentNode.dataset.categoryid

    categoryID && swalConfirm('category', categoryDeleteFunction, categoryID)
  }
  return (
    <>
      <div className='categoryName-wrapper' data-categoryid={categoryID}>
        {requesting && <Loading small />}
        <h3>{category.categoryName}</h3>
        {!requesting && !subCategories && (
          <RemoveCircleIcon onClick={handleCategoryDelete} />
        )}
      </div>

      {subCategories &&
        subCategories.map((subcategory, index) => {
          if (!subcategories.find((sub) => sub.id === subcategory.id)) {
            dispatch(actions.setSubcategory(subcategory))
          }
          return (
            subcategory && (
              <div
                style={{
                  padding: '20px',
                  margin: '20px',
                  background: 'red'
                }}
              >
                <Draggable
                  id={subcategory.id}
                  draggableId={subcategory.id}
                  index={parentIndex + index}
                  key={subcategory.id}
                >
                  {(provided, snapshot) => (
                    <>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='subcategory-wrapper'
                        key={subcategory.id}
                        data-subid={subcategory.id}
                        style={{
                          transform: 'none !important'
                        }}
                      >
                        <CategoryLink to={categoryID + '/' + subcategory.id}>
                          {subcategory.subcategoryName}
                        </CategoryLink>
                        <DeleteForeverIcon onClick={handleSubCategoryDelete} />
                      </div>
                      <div style={{ visibility: 'hidden', height: 0 }}>
                        {provided.placeholder}
                      </div>
                    </>
                  )}
                </Draggable>
              </div>
            )
          )
        })}
    </>
  )
}

export default SubCategories
