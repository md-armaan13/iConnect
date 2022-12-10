class ChatEngine{

    constructor(chatBoxId,userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //establishing the connection
        this.socket = io.connect('http://13.82.150.215:5000',{transports: ['websocket']});// io is global variable available when we include cdn

        if(this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){
        let self =this;
        this.socket.on('connect',function(){
            console.log("conection establish fron client side ");
  //INitializing an event
            self.socket.emit('join_room',{
              //sending the data
                user_email :self.userEmail,
                chatroom: 'iConnect'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            });

            $('#message-submit').click(function(){
                let msg = $('#message-input').val();
                if(msg!=''){
                    self.socket.emit('send_message',{
                        message : msg,
                        user_email :self.userEmail,
                        chatroom : 'iConnect'

                    })
                    $('#message-input').val('');
                }
            })

        });

        self.socket.on('message_received',function(data){
            console.log('messge received',data.message);

            let newmessage = $('<li>');
                newmessage.addClass('message');

            let messageType='right';
            if(data.user_email== self.userEmail){
                messageType='left';

            }
            newmessage.append($('<span>',{
                'html':data.user_email
            }));

            newmessage.append($('<p>',{
                'html':data.message,
            }));

            newmessage.addClass(messageType);

            $('#chat').append(newmessage);


        })

    }
}