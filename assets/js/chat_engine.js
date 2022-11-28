class ChatEngine{

    constructor(chatBoxId,userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //establishing the connection
        this.socket = io.connect('http://localhost:5000',{transports: ['websocket']});// io is global variable available when we include cdn

        if(this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){

        this.socket.on('connect',function(){
            console.log("conection establish fron client side ");

        })

    }
}