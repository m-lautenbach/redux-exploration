import { cond, path, T, set } from 'ramda'
import { hasType, state, updateState } from '../../utils'
import { lensTasks } from '../lenses'


export default cond([
  [hasType('CREATE_TASK'), updateState(set(lensTasks), path(['payload', 'newTask']))],
  [T, state],
])
