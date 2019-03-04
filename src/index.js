import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import io from 'socket.io-client';
import Main from './components/Main'
import store from './client/store'

const socket = io();
hydrate(<Provider store={store}><Main /></Provider>, document.getElementById('app'))
