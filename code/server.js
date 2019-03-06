import React from 'react'
import express from 'express'
import { createServer } from 'http'
import path from 'path'
import fs from 'fs'
import { listen } from 'socket.io'
import render from './src/server/render'
import { create as createStore } from './src/server/store'
import requestToLocation from './src/server/requestToLocation'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const db = lowdb(new FileSync('data/db.json'))
const port = process.env.PORT || 3000
const app = express()
const http = createServer(app)
const io = listen(http)

app.use('/static', express.static(__dirname + '/dist'))

let store

function startPersisting() {
  db.set('redux', store.getState()).write()
  setTimeout(startPersisting, 2000)
}

app.get('*', function (request, response) {
  fs.readFile(
    path.resolve(__dirname, 'dist/index.html'),
    (_, template) => {
      if (!store) {
        store = createStore(db.get('redux').value())
        startPersisting()
      }
      store.dispatch({
        type: 'USER_NAVIGATION',
        payload: { newLocation: requestToLocation(request) },
      })
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
