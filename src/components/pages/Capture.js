import React from 'react'
import { connect } from 'react-redux'

export default connect(
  null,
  dispatch => ({
    onConfirm: (title) => dispatch({ type: 'CREATE_TASK', payload: { newTask: { title} } }),
  }),
)(({ onConfirm }) =>
  <div>
    <h1>Capture</h1>
    <input
      type="text"
      autoFocus
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onConfirm(e.target.value)
          e.target.value = ''
        }
      }}
    />
  </div>,
)
