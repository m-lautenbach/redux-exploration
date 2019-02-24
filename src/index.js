/** @jsx h */
import { h, render } from 'preact'
// Enable debug mode. You can reduce the size of your app by only including this
// module in development builds. eg. In Webpack, wrap this with an `if (module.hot) {...}`
// check.
require('preact/debug')
import { Provider } from 'preact-redux'
import Main from './Main'
import store from './store'

render(<Provider store={store}><Main/></Provider>, document.body)
