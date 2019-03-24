import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Main from '../shared/components/Main'
import store from './store'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/static/assets/sw.js').then(function(registration) {
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

hydrate(<Provider store={store}><Main /></Provider>, document.getElementById('app'))
