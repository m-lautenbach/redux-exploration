import React from 'react'
import express from 'express'
import path from 'path'
import fs from 'fs'
import render from './src/server/render'

const port = process.env.PORT || 3000
const app = express()

app.use('/static', express.static(__dirname + '/dist'))

// serve all non-static files with prerendered index.html
app.get('*', function (request, response) {
  fs.readFile(
    path.resolve(__dirname, 'dist/index.html'),
    (_, template) => response.send(render(request, template.toString())),
  )
})

app.listen(port)
console.log('server started on port ' + port)
