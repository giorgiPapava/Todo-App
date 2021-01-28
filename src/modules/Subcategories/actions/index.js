import { constants } from 'modules/Subcategories'

export const setSubcategory = (payload) => {
  return (dispatch) => {
    dispatch({ type: constants.SET_SUBCATEGORIES, payload})
  }
}

