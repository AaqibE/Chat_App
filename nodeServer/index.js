//node server which will handle socket.io connection
const io = require('socket.io')(7000, {
        cors:{
            origin: "*",
        }
        })
const cors = require("cors")


 
const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("New users", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });

})
