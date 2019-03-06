import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Main from '../shared/components/Main'
import store from './store'

hydrate(<Provider store={store}><Main /></Provider>, document.getElementById('app'))
