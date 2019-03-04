import React from 'react'
import express from 'express'
import { createServer } from 'http'
import path from 'path'
import fs from 'fs'
import { listen } from 'socket.io'
import render from './src/server/render'

const port = process.env.PORT || 3000
const app = express()
const http = createServer(app)
const io = listen(http)

app.use('/static', express.static(__dirname + '/dist'))

// serve all non-static files with prerendered index.html
app.get('*', function (request, response) {
  fs.readFile(
    path.resolve(__dirname, 'dist/index.html'),
    (_, template) => response.send(render(request, template.toString())),
  )
})

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('actions', (action, callback) => console.log(action) || callback(true))
})

http.listen(port)
console.log('server started on port ' + port)
