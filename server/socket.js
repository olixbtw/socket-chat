const socketHandler = (io) => function (socket) {
  console.log(`${socket.id} - connected`)

  socket.on('message', (data) => {
    console.log(data)

    io.sockets.emit('message', data)
  })

  
}

module.exports = socketHandler;
