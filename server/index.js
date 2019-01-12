const express = require('express')
const app = express()

server = app.listen(3001, function () {
  console.log('server listening on port 3001')
})

const io = require('socket.io')(server)

io.on('connection', function (socket) {
  if (io.engine.clientsCount == 1) {
    io.emit('BLUE_CONNECTED_S')
    console.log('blue player connected')
  }
  else if (io.engine.clientsCount == 2) {
    io.emit('GRAY_CONNECTED_S')
    console.log('gray player connected')
  }
  else {
    io.emit('SPECTATOR_CONNECTED')
    console.log('spectator connected')
  }
  socket.on('PLACE_BUILDER_C', data => {
    io.emit('PLACE_BUILDER_S', data)
  })
  socket.on('SELECT_BUILDER_C', data => {
    io.emit('SELECT_BUILDER_S', data)
  })
  socket.on('MOVE_BUILDER_C', data => {
    io.emit('MOVE_BUILDER_S', data)
  })
  socket.on('BUILD_STRUCTURE_C', data => {
    io.emit('BUILD_STRUCTURE_S', data)
  })
})
