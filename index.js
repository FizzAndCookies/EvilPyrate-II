//imports
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io')
const session = require('express-session');
const fs = require('fs');
const mainRoutes = require('./Routes/mainRoutes'); //MAIN ROUTES
const downloadRoutes = require('./Routes/downloadRoutes'); //DOWNLOAD ROUTES
const socketConnection = require('./Socket/socket'); //SOCKET

//initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);



//variables
let all_clients =[];
let all_socket = []; //STORE ALL SOCKET CONNECTIONS
const room = "FizzAndCookiesR1"; //ROOM NAME
const PORT = process.env.port || 3000; //PORT

//middlewares
app.use(express.static(__dirname+'/public')); //STATIC FILES
app.use(cors())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/',mainRoutes);
app.use('/download',downloadRoutes);

//socket 
socketConnection(io);



  //listen
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});