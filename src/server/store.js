import { createStore } from 'redux'
import reducer from '../reducer'
import createInitialState from './createInitialState'
import reducers from './reducers'
import requestToLocation from './requestToLocation'

export const create = (request) => {
  const initialState = createInitialState(requestToLocation(request))
  return createStore(reducer(reducers), initialState)
}
