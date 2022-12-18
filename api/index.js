const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: {origin:"*"} });
const port =process.env.PORT || 8000

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
server.listen(port,()=>
{
    console.log("server listening on port "+port)
    // console.log(http)
    console.log(server)
})

app.get("/", (req, res) => {
    if(http)
    {
        // alert("http is working");
        console.log(http)
    }
    if(server)
    {
        // alert("server is working");
        console.log(server)
    }
    if(io)
    {
        // alert("io is working");
        console.log(io)
    }
  res.status(200).send("Express app listening on port "+port);
});