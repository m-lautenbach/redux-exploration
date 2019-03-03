import { cond, path, T, prepend, pipe, over } from 'ramda'
import { hasType, state, updateState } from '../../utils'
import { lensTasks } from '../lenses'


export default cond([
  [
    hasType('CREATE_TASK'),
    updateState(
      over(lensTasks),
      pipe(path(['payload', 'newTask']), prepend)
    ),
  ],
  [T, state],
])
