const express = require("express");
const { Server } = require("socket.io");
var https = require("https");
const http = require("http");
var fs = require("fs");
var path = require("path");

var options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/safestencryption.com/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/safestencryption.com/fullchain.pem"
  ),
};

const app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(80);
httpsServer.listen(443);

const io = new Server(httpServer);

app.enable("trust proxy");
app.use((req, res, next) => {
  if (process.env.NODE_ENV != "development" && !req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send("ok");
});

app.get("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + "/static" + req.url);
});

let usersConnected = 0;
io.on("connection", (socket) => {
  usersConnected++;
  console.log("Someone connected.");
  io.emit("users", usersConnected);

  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });
  socket.on("panic", () => {
    io.emit("panic");
    console.log("Someone activated panic.");
  });
  socket.once("disconnect", () => {
    console.log("Someone diconnected.");
    usersConnected--;
    io.emit("users", usersConnected);
  });
});
