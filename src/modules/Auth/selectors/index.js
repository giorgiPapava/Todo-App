import { createSelector } from 'reselect'
import { moduleName } from 'modules/Auth'

export const selectAuth = createSelector(
    (state) => state[moduleName],
    (state) => state
)

export const selectAuthLoading = createSelector(
    selectAuth,
    (state) => state.loading
)

export const selectUser = createSelector(
    selectAuth,
    (state) => state.user
)

export const selectUid = createSelector(
    selectUser,
    (user) => user.uid
)