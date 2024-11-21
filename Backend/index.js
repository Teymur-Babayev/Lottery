var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');  
var socketIo = require('socket.io'); 
var connectDB = require('./config/Database');
var cors = require('cors');  
var app = express();
const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 5000;
var { bind, router } = require('./communication/communication');

app.use(cors({
  origin: 'http://192.168.145.30:5173',  
  methods: ['GET', 'POST'],
  credentials: true  
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use('/api', router);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://192.168.145.30:5173', 
    methods: ['GET', 'POST'],
    credentials: true  
  }    
});

var sockets = [], users = [];

bind(io, sockets, users);

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
