const express = require('express')
const {Server} = require('socket.io')
var https = require('https')
const http = require('http')
var fs = require('fs');
var path = require('path')

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/safestencryption.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/safestencryption.com/fullchain.pem')
};

const app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(80);
httpsServer.listen(443);

const io = new Server(httpsServer)

app.enable('trust proxy')
app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})

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
  res.sendFile(__dirname + '/static/index.html')
});

app.get('/index', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/static/index.html')
});

app.get('/custom', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/static/custom.html')
});

app.get('/chat', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.sendFile(__dirname + '/static/chat.html')
});

app.use(express.static(path.join(__dirname, 'static')))
app.use('/assets', express.static('assets'));

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
