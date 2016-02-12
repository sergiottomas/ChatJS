var server = require('http').createServer(index),
io = require('socket.io').listen(app),
fs = require('fs');

server.listen(3000, function(){
  console.log("Servidor rodando!");
})
