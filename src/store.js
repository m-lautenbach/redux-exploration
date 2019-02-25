import { createStore, applyMiddleware } from 'redux'
import { compose, set } from 'ramda'

import { lensState as routingState } from './routing/lenses'
import locationToPersistable from './routing/locationToPersistable'
import reducer from './reducer'
import middlewares from './middlewares'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducer,
  compose(
    set(routingState, locationToPersistable(window.location)),
  )(undefined),
  composeEnhancers(applyMiddleware(...middlewares)),
)
