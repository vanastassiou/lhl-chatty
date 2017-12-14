const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
let usersInChat = 0;

// Client connection handler

wss.on('connection', function connection(ws) {
  console.log('Client connected.');
  usersInChat += 1;
  broadcastServerMessage({
    type: 'updateUsersInChat',
    id: Math.random(),
    userNumber: usersInChat
  });

  ws.on('close', function connection(ws) {
    console.log('Client disconnected');
    usersInChat -= 1;
    broadcastServerMessage({
      type: 'updateUsersInChat',
      id: Math.random(),
      userNumber: usersInChat
    });
  });

  // Event listener
  ws.on('message', function(data) {
    console.log(data);

    wss.clients.forEach(function (client) {
      client.send(data);
    });

    let notification = JSON.parse(data);
    if (notification.type === 'postMessage') {
      console.log(`User ${notification.username} said: \"${notification.content}\"`);
    } else if (notification.type === 'postNotification') {
      console.log(notification.content);
      broadcastServerMessage(notification.content);
    };
  });
});

function broadcastServerMessage(serverResponse) {
  let chatroomNotice = JSON.stringify(serverResponse);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(chatroomNotice);
    }
  });
};
