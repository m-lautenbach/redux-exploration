import React from 'react'
import { connect } from 'react-redux'
import { view } from 'ramda'
import uuidv4 from 'uuid/v4'
import { lensTasks } from '../../tasks/lenses'

export default connect(
  state => ({
    tasks: view(lensTasks, state) || [],
  }),
  dispatch => ({
    onConfirm: (title) => dispatch({ type: 'CREATE_TASK', payload: { newTask: { title, id: uuidv4() } } }),
  }),
)(({ onConfirm, tasks }) =>
  <div>
    <h1>Capture</h1>
    <input
      type="text"
      autoFocus
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target.value.length > 0) {
          onConfirm(e.target.value)
          e.target.value = ''
        }
      }}
      css={{
        fontFamily: '\'Quicksand\', sans-serif',
        marginBottom: '.5rem'
      }}
    />
    {
      tasks.map(
        ({ title, id }) => <div key={id}>{title}</div>,
      )
    }
  </div>,
)
