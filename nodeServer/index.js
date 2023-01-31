// Node server to handle the socket io connectins

const io = require('socket.io')(8000,{cors:{origin:'*',}});

const users = {};

io.on("connection", socket =>{
    socket.on("new-user-joined",name =>{
        console.log("New-user-joined",name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined",name)
    })

    socket.on("send-message",message =>{
        socket.broadcast.emit("receive-message", {message: message, name: users[socket.id]})
    })

    socket.on("disconnect", data =>{
        socket.broadcast.emit("left",users[socket.id]);
        delete users[socket.id];
    })
})