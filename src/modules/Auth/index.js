import * as actions from 'modules/Auth/actions'
import * as constants from 'modules/Auth/constants'
import reducer from 'modules/Auth/reducer'
// import saga from '@src/modules/Auth/sagas'
import * as selectors from 'modules/Auth/selectors'

const moduleName = 'auth'

export {
  moduleName,
  actions,
  constants,
  reducer,
//   saga,
  selectors
}
