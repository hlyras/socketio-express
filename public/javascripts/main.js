var socket = io();

function renderMessage(data){
  $('.messages').append("<div class='message'><strong>"+ data.username + "</strong>: "+data.message+"</div>")
};

socket.on('previousMessages', data => {
  data.forEach(message => {
    renderMessage(message);
  });
});

socket.on('receivedMessage', message => {
  renderMessage(message);
});

$('#chat').submit(function(event) {
  event.preventDefault();

  var username = $('input[name=username]').val()
  var message = $('input[name=message]').val()

  if(username.length && message.length) {
    var messageObject = {
      username: username,
      message: message
    };

    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
  };
});