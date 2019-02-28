import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Main from './components/Main'
import store from './client/store'

hydrate(<Provider store={store}><Main /></Provider>, document.getElementById('app'))
