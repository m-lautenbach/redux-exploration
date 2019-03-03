import routing from './routing/internal/reducer'
import tasks from './tasks/internal/reducer'

const reducers = [routing, tasks]

export default (state, action) => reducers.reduce((nextState, reducer) => reducer(action, nextState), state)
