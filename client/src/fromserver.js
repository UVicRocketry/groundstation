var mainSocket = new WebSocket("ws://localhost:9000");

mainSocket.onopen = function(event){
    console.log("Connection open");
}

mainSocket.onmessage = function(event){
    //What to do when receiving a string of data from server
    var data = {};
   
    try{
        data = JSON.parse(event.data);
    }catch (err){
        console.log("Error parsing JSON");
        return;
    }
    
    handle(data);   
}//on message

