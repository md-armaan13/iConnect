
const { Server } = require("socket.io");

module.exports.chatSockets= function(socketServer){
    const io = new Server(socketServer);

    io.on("connection", (socket) => {
        
      });


}