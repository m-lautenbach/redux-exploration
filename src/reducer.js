import { compose } from 'ramda'
import routing from './routing/internal/reducer'

const reducers = [routing]

export default compose(...reducers)
