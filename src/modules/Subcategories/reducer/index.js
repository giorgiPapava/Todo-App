import { constants } from 'modules/Subcategories'

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_SUBCATEGORIES:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
};

export default reducer
