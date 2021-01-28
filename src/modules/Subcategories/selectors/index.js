import { createSelector } from 'reselect'
import { moduleName } from 'modules/Subcategories'

export const selectSubcategories = createSelector(
    (state) => state[moduleName],
    (state) => state
)