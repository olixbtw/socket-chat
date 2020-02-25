const button = document.getElementById('button'),
  help = document.getElementById('help'),
  chat = document.getElementById('chat'),
  message = document.getElementById('message'),
  name = document.getElementById('name');

button.addEventListener('click', () => {

  chat.innerHTML += `<div class="your_message"><b>${name.value}:</b>${message.value}</div>`

})