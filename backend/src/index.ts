import { Server, Socket } from "socket.io";
import { createServer } from 'node:http';
const express = require('express');


const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket:Socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
