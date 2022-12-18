const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: {origin:"*"} });

const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive', {message:message, name:users[socket.id]});
    });
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });
});
server.listen(process.env.PORT || 8000)
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
