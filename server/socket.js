const socketHandler = (io) => function (socket) {
  
  console.log(`${socket.id} - connected`)
  socket.emit('connectCallback', socket.id)

  socket.on('message', (data) => {
    io.emit('message', {
      ...data,
      id: socket.id
    })
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

}

module.exports = socketHandler;
