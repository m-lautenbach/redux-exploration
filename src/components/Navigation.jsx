import React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import { view, map, equals, flip, apply, useWith, prop, pipe } from 'ramda'

import pages from './pages'
import { lensPath } from '../routing/lenses'
import pagePaths from '../routing/pagePaths'

const stateToProps = spec => (state, props) => map(flip(apply)([state, props]), spec)

const Item = connect(
  stateToProps({
    active: useWith(equals, [view(lensPath), pipe(prop('page'), flip(prop)(pagePaths))]),
  }),
  (dispatch, { page }) => ({
    onClick: () => dispatch({
      type: 'NAVIGATE_TO',
      payload: { type: 'page', page },
    }),
  }),
)(
  ({ title, onClick, active }) =>
    <div
      {...{ onClick }}
      className={css`
        user-select: none;
        text-transform: capitalize;
        cursor: pointer;
        border: #484848 solid 1px;
        border-right: none;
        border-left: none;
        border-radius: .2rem;
        padding: .2rem;
        transition: background-color .8s;
        ${!active && css`:hover {
          background-color: #e1f0fa;
        }`}
        ${active && css`background-color: #ffe6e6;`}
      `}
    >
      {title}
    </div>,
)
Item.displayName = 'Item'

const Navigation = () =>
  <div className={css`
      display: flex;
      > * {
        margin-right: 1rem;
      };
      > *:last-child { margin-right: 0 };
      justify-content: space-evenly;
  `}>
    {
      ['HOME', 'TASK_LIST', 'CONTEXT_LIST'].map(
        page =>
          <Item key={page} title={pages[page].title} page={page}/>,
      )
    }
  </div>

export default Navigation
