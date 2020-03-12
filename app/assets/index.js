(async () => {
  //socket
  let settings = await fetch("./../../server/settings.json").then(res => res.json());

  let socket = io.connect(`${settings.host}:${settings.port.server}`);

  const mySocket = {
    id: null
  }

  //elements
  const button = document.getElementById('button'),
    scroller = document.getElementById('scroller'),
    help = document.getElementById('help'),
    chat = document.getElementById('chat'),
    message = document.getElementById('message'),
    name = document.getElementById('name');


  // handlers
  button.addEventListener('click', () => {
    if (message.value.length && name.value.length)
      socket.emit('message', {
        message: message.value,
        name: name.value
      })
  })

  message.addEventListener('input', () => {
    if (message.value.length && name.value.length) {
      name.disabled = true

      socket.emit('typing', {
        name: name.value
      })
    }
    if (!message.value.length)
      socket.emit('typing', {
        name: null
      })
  })


  //sockets
  socket.on('connectCallback', (data) => mySocket.id = data)

  socket.on('message', function (data) {
    if (data.name && data.message) {

      mySocket.id === data.id
        ? chat.innerHTML += `<p class="message message__user"><b>You:</b>${data.message}</p>`
        : chat.innerHTML += `<p class="message"><b>${data.name}:</b>${data.message}</p>`

      help.innerHTML = ``
      scroller.scrollTop = scroller.scrollHeight
    }
  });

  socket.on('typing', function (data) {
    data.name
      ? help.innerHTML = `<em>${data.name} is typing ...</em>`
      : help.innerHTML = ``

    // if user scrolled a bit to top, message will still appear (window will be scrolled to bottom)
    // if user scrolled a lot - not showing message (not scrolling)
    if (scroller.scrollTop + scroller.offsetHeight > scroller.scrollHeight - 100)
      scroller.scrollTop = scroller.scrollHeight
  });

})()