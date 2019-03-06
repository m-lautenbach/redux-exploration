import React from 'react'
import express from 'express'
import { createServer } from 'http'
import path from 'path'
import fs from 'fs'
import { listen } from 'socket.io'
import render from './src/server/render'
import { create as createStore } from './src/server/store'
import requestToLocation from './src/server/requestToLocation'

const port = process.env.PORT || 3000
const app = express()
const http = createServer(app)
const io = listen(http)

app.use('/static', express.static(__dirname + '/dist'))

let store
// serve all non-static files with prerendered index.html
app.get('*', function (request, response) {
  fs.readFile(
    path.resolve(__dirname, 'dist/index.html'),
    (_, template) => {
      if (!store) {
        store = createStore(request)
      } else {
        store.dispatch({
          type: 'USER_NAVIGATION',
          payload: { newLocation: requestToLocation(request) },
        })
      }
      response.send(render(template.toString(), store))
    },
  )
})

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('actions', (actions, callback) => {
    actions.forEach(store.dispatch)
    callback(true)
  })
})

http.listen(port)
console.log('server started on port ' + port)
