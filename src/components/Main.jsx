import React from 'react'
import { connect } from 'react-redux'
import Navigation from './Navigation'
import { getPageByRoute } from '../routing/selectors'

const Main = connect(
  state => ({
    ActivePage: getPageByRoute(state).Component,
  }),
)(
  ({ ActivePage }) =>
    <div
      id="main"
      css={{
        fontFamily: '\'Quicksand\', sans-serif',
      }}
    >
      <Navigation />
      <ActivePage />
    </div>,
)
Main.displayName = 'Main'
export default Main
