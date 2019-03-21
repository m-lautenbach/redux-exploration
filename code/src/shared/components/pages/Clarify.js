import React from 'react'
import { connect } from 'react-redux'
import { view } from 'ramda'
import { lensTasks } from '../../tasks/lenses'

export default connect(
  state => ({
    tasks: view(lensTasks, state) || [],
  }),
)(({ onConfirm, tasks }) =>
  <div>
    <h1>Clarify</h1>
    {
      tasks.map(
        ({ title, id }) => <div key={id}>{title}</div>,
      )
    }
  </div>,
)
