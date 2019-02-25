/** @jsx h */
import { h } from 'preact'
import { connect } from 'preact-redux'
import { lensProp, view, compose } from 'ramda'
import { lensPath, lensQuery } from './routing/lenses'

const lensTestPage = lensPath('/test/:id')
const lensId = compose(
  lensTestPage,
  lensProp('id'),
)
const lensFilter = compose(lensQuery, lensProp('filter'))

export default connect(
  state => ({
    atTestPage: view(lensTestPage, state) !== null,
    testPageId: view(lensId, state),
    filter: view(lensFilter, state),
  }),
)(
  ({ atTestPage, testPageId, filter }) =>
    <div id="foo">
      <h1>Hello World</h1>
      <span>{atTestPage && 'atTestPage'} {testPageId} {filter}</span>
    </div>,
)
