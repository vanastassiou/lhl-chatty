const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });


wss.on("connection", function connection(ws) {
  console.log("Client connected.");
  // Event listener
  ws.on("message", function(data) {
    console.log(data);
    wss.clients.forEach(function (client) {
      client.send(data);
    });
  });
});
