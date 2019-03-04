import routing from './routing/internal/reducer'
import tasks from './tasks/internal/reducer'
import serverEvents from './serverEvents/internal/reducer'

const reducers = [routing, tasks, serverEvents]

export default (state, action) => reducers.reduce((nextState, reducer) => reducer(action, nextState), state)
