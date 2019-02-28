import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import express from 'express'
import path from 'path'
import fs from 'fs'
import createInitialState from './src/createInitialState'
import reducer from './src/reducer'
import Main from './src/components/Main'

const port = process.env.PORT || 3000
const app = express()

app.use('/static', express.static(__dirname + '/dist'))

const render = (request) => {
  const [pathname, search] = request.originalUrl.split('?')
  const location = { pathname, search: search ? `?${search}` : '' }
  const initialState = createInitialState(location)
  const store = createStore(reducer, initialState)

  const rendered = renderToString(
    <Provider store={store}>
      <Main/>
    </Provider>,
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  return { rendered, preloadedState }
}

// serve all non-static files with prerendered index.html
app.get('*', function (request, response) {
  fs.readFile(
    path.resolve(__dirname, 'dist/index.html'),
    (_, data) => {
      const template = data.toString()
      const { rendered, preloadedState } = render(request)
      response.send(template
        .replace(
          '<div id="app"></div>',
          `${rendered}
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\\u003c',
          )}
        </script>`,
        ),
      )
    },
  )
})

app.listen(port)
console.log('server started on port ' + port)
