import { createSelector } from 'reselect'
import { moduleName } from 'modules/Firestore'

export const selectFirestore = createSelector(
  (state) => state[moduleName],
  (state) => state
)

export const selectFirestoreData = createSelector(
  selectFirestore,
  (state) => state.data
)

// deleted todos
export const selectDeletedTodos = createSelector(
  selectFirestoreData,
  (state) => state.deletedTodos && Object.entries(state.deletedTodos).map(([key, value]) => ({
    id: key,
    ...value
  }))
)

export const selectRequestingDeletedTodos = createSelector(
  selectFirestore,
  (state) => state.status.requesting.deletedTodos
)

// categories
export const selectCategories = createSelector(
  selectFirestoreData,
  (state) => state.categories && Object.entries(state.categories).map(([key, value]) => (value && {
    id: key,
    ...value
  }))
)

export const selectRequestingCategories = createSelector(
  selectFirestore,
  (state) => state.status.requesting.categories
)

// subcategories
export const selectSubCategories = (state, categoryID) => {
  return createSelector(
    selectFirestoreData,
    (state) => state[`subcategory-${categoryID}`] && Object.entries(state[`subcategory-${categoryID}`]).map(([key, value]) => (value && {
      id: key,
      ...value
    }))
  )(state)
}

export const selectRequestingSubCategories = (state, categoryID) => {
  return createSelector(
    selectFirestore,
    (state) => state.status.requesting[`subcategory-${categoryID}`]
  )(state)
}

// todos
export const selectTodos = createSelector(
  selectFirestoreData,
  (state) => state.todos && Object.entries(state.todos).map(([key, value]) => ({
    id: key,
    ...value
  }))
)

export const selectRequestingTodos = createSelector(
  selectFirestore,
  (state) => state.status.requesting.todos
)

// starredtodos
export const selectStarredTodos = createSelector(
  selectFirestoreData,
  (state) => state.starredTodos && Object.entries(state.starredTodos).map(([key, value]) => ({
    id: key,
    ...value
  })).filter((todo) => todo.starred)
)

export const selectRequestingstarredTodos = createSelector(
  selectFirestore,
  (state) => state.status.requesting.starredTodos
)
