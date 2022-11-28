
//const { Server } = require("socket.io");

module.exports.chatSockets= function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on("connection", (socket) => {
        console.log("new connection received",socket.id);
        socket.on('disconnect',()=>{
            console.log('socket disconnected');
    
          })
      });

      

}