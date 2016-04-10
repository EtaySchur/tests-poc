/**
 * Created by EtaySchur on 10/04/2016.
 */

var express   = require('express');
var app      = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var connectedCount = 0;

app.get('/', function(req, res){
    app.use("/styles", express.static(__dirname + '/styles'));
    app.use("/scripts", express.static(__dirname + '/scripts'));
    app.use("/partials", express.static(__dirname + '/partials'));

    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    connectedCount += 1;

    socket.on('disconnect', function(){
        connectedCount -= 1;
    });

    socket.on('update-data', function(gameData){
        io.emit('update-data', gameData );
    });

    socket.on('check-for-online-user', function(users){
        io.emit('check-for-online-user', connectedCount );
    });


    socket.on('user-logged-in', function(userData){
        io.emit('user-logged-in', userData );
    });



});

http.listen(3000, function(){
    console.log('listening on *:3000');
});