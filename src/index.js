import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { pipe, view, filter, prop, last, lte, isEmpty } from 'ramda'
import io from 'socket.io-client'
import Main from './components/Main'
import store from './client/store'
import { lensActions } from './serverEvents/lenses'

const socket = io()

let index = 0
store.subscribe(() => {
  const newActions = pipe(
    view(lensActions),
    filter(pipe(prop('index'), lte(index))),
  )(store.getState())
  if (isEmpty(newActions)) {
    return
  }
  const oldIndex = index
  index = last(newActions).index + 1
  socket.emit(
    'actions',
    newActions,
    successful =>
      successful &&
      store.dispatch({
        type: 'CLEAR_SERVER_ACTIONS',
        payload: { from: oldIndex, to: index },
      }),
  )
})

hydrate(<Provider store={store}><Main /></Provider>, document.getElementById('app'))
