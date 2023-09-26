let all_socket =[]
const room = "FizzAndCookiesR1"; //ROOM NAME

module.exports=(io)=>{

//socket io code
io.on('connection',(socket)=>{
    
    //handle socket connection error
    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
    });

    //join new clients to room
    socket.on('joinRoom', (data) => {
        socket.join(room);
        userObj = {"id":socket.id,"admin":(data.user==true)?false:true,"os":data.os,"joined":data.time,"userdata":data.data,"nickname":socket.id};
        console.log(`User joined room: ${room}`);
        all_socket.push(userObj);
        admins = all_socket.filter((element)=>element.admin == true);
        admins.forEach(element => {
          if(userObj.id !=element.id){
            io.to(element.id).emit("newcon",{userObj})
          };
        });
      });

});
}