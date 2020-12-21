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