const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });


wss.on("connection", function connection(ws) {
  console.log("Client connected.");

  broadcastOnlineUsers();

  ws.on("message", function(data) {
    console.log(data);

    wss.clients.forEach(function (client) {
      client.send(data);
    });

    let notification = JSON.parse(data);
    let serverResponse = {};

    if (notification.type === 'postMessage') {
      console.log(`User ${notification.username} said: \"${notification.content}\"`);

    } else if (notification.type === 'postNotification') {
      console.log('Notification content:', notification.content);
      serverResponse = {
        type: 'incomingNotification',
        id: Math.random(),
        content: notification.content
      };
    }

    let chatroomNotice = JSON.stringify(serverResponse);
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(chatroomNotice);
      }
    });

  ws.on('close', () => {
    console.log('A client has disconnected.');
    broadcastOnlineUsers();
  });
});

function broadcastOnlineUsers() {
  const onlineUsers = {
    id: math.Random(),
    content: String(wss.clients.size),
    type: 'onlineUsers'
  };
  broadcast(onlineUsers);
}
