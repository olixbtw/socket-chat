(async () => {
  //socket
  let settings = await fetch("./../../server/settings.json").then(res => res.json());

  var socket = io.connect(`${settings.host}:${settings.port.server}`);

  // test fetch to node
  fetch(`${settings.host}:${settings.port.server}/api/users`)
    .then(res => res.json())
    .then(data => console.log(data))


  //app
  const button = document.getElementById('button'),
    help = document.getElementById('help'),
    chat = document.getElementById('chat'),
    message = document.getElementById('message'),
    name = document.getElementById('name');

  button.addEventListener('click', () => {

    if (message.value.length && name.value.length) {

      socket.emit('message', {
        message: message.value,
        name: name.value
      })

      // message.value = "";
    }

  })

  socket.on('message', function (data) {
    console.log(data)
    // feedback.innerHTML = '';
    // output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    chat.innerHTML += `<p><b>${data.name}:</b>${data.message}</p>`
  });

})()