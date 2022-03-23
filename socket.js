const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
var path = require('path')


const app = express();
const server = http.createServer(app)
const io = new Server(server)


app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send('ok')
});

app.get('/socket.io.js', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/socket.io.js')
});

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/client/index.html')
});

app.get('/index', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/client/index.html')
});

app.get('/secret', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/client/secret.html')
});

app.get('/chat', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/client/chat.html')
});


app.use(express.static(path.join(__dirname, 'client')))

usersConnected = 0

io.on('connection', function(socket){

    usersConnected++
    console.log("Someone connected.")
    io.emit('users', usersConnected)

    socket.on('chat', function(msg){
        io.emit('chat', msg)
    })
    socket.on('panic', function(){
        io.emit('panic')
        console.log("Someone activated panic.")
    })
    socket.once('disconnect', function(){
      console.log("Someone diconnected.")
      usersConnected--
      io.emit('users', usersConnected)
    })

})


server.listen(80, () => {
  console.log('listening on *:80')
});
