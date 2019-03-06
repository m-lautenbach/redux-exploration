import { createStore } from 'redux'
import combineReducers from '../shared/combineReducers'
import createInitialState from './createInitialState'
import reducers from './reducers'
import requestToLocation from './requestToLocation'

export const create = (request) => {
  const initialState = createInitialState(requestToLocation(request))
  return createStore(combineReducers(reducers), initialState)
}
