/** @jsx h */
import { h } from 'preact'

export default () =>
  <div id="foo">
    <span>Hello, world!</span>
    <button onClick={() => alert('hi!')}>Click Me</button>
  </div>
