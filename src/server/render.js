import React from 'react'
import { createStore } from 'redux'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import reducer from '../reducer'
import reducers from './reducers'
import Main from '../components/Main'
import createInitialState from '../createInitialState'

export default (request, template) => {
  const [pathname, search] = request.originalUrl.split('?')
  const location = { pathname, search: search ? `?${search}` : '' }
  const initialState = createInitialState(location)
  const store = createStore(reducer(reducers), initialState)

  const rendered = renderToString(
    <Provider store={store}>
      <Main />
    </Provider>,
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  return template
  .replace(
    '<div id="app"></div>',
    `<div id="app">${rendered}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\\u003c',
    )}
        </script>`,
  )
}
