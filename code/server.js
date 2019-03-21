// noinspection ES6UnusedImports
import regeneratorRuntime from 'regenerator-runtime'
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
import GhStorage from 'lowdb-gh-adapter'
import { promisifyAll } from 'bluebird'

(async function () {
  promisifyAll(fs)

  const config = JSON.parse(await fs.readFileAsync(path.resolve(__dirname, '../data/config.json')))

  const db = await lowdb(new GhStorage(config.ghStorage))
  db.defaults({}).write()
  const port = process.env.PORT || 3000
  const app = express()
  const http = createServer(app)
  const io = listen(http)

  app.use('/static', express.static(__dirname + '/dist'))

  let store

  let state

  async function startPersisting() {
    const newState = store.getState()
    if (!state || newState !== state) {
      await db.set('redux', newState).write()
      state = newState
    }
    setTimeout(startPersisting, 2000)
  }

  app.get('*', async function (request, response) {
    if (request.path === '/favicon.ico') {
      return response.status(404).end()
    }
    const template = await fs.readFileAsync(path.resolve(__dirname, 'dist/index.html'))
    if (!store) {
      store = createStore(await db.get('redux').value())
      state = store.getState()
      startPersisting()
    }
    store.dispatch({
      type: 'USER_NAVIGATION',
      payload: { newLocation: requestToLocation(request) },
    })
    response.send(render(template.toString(), store))
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
})()
