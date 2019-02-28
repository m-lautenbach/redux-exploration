import React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
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
      className={css`
        font-family: 'Quicksand', sans-serif;
      `}
    >
      <Navigation />
      <ActivePage />
    </div>,
)
Main.displayName = 'Main'
export default Main
