import { compose, flip, map } from 'ramda'
import routing from './routing/internal/reducer'

const reducers = [routing]

export default compose(...map(flip, reducers))
