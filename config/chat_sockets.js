
//const { Server } = require("socket.io");

module.exports.chatSockets= function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on("connection", (socket) => {
        console.log("new connection received",socket.id);
        socket.on('disconnect',()=>{
            console.log('socket disconnected');
    
          })
          // Receiving an evetnt
          socket.on('join_room',function(data){
            console.log("Joining request received",data);
            // if the room called data.chatroom already exist then the user will be connected to that chatRoom
            //if it does not exist then it will create one 
            socket.join(data.chatroom);
            //other user in the chatroom should receive the notification that user had joined
            
            // to emit in aspecific chatroom otherwise io.emit
            io.in(data.chatroom).emit('user_joined',data);

             
        
        });


        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('message_received',data);
        });

        
      });

      

}