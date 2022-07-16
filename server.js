const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const https = require("https");
const fs = require("fs");

const httpPort = 80;
const httpsPort = 443;
const keysPath = "/etc/letsencrypt/live/safestencryption.com";

const app = express();

const httpServer = http.createServer(app);
httpServer.listen(httpPort);

if (fs.existsSync(keysPath + "/privkey.pem") && fs.existsSync(keysPath + "/fullchain.pem")) {
  var options = {
    key: fs.readFileSync(keysPath + "/privkey.pem"),
    cert: fs.readFileSync(keysPath + "/fullchain.pem"),
  };
  var httpsServer = https.createServer(options, app);
  httpsServer.listen(httpsPort);
  var io = new Server(httpsServer);
  console.log("HTTPS server listening on port " + httpsPort);

  app.enable("trust proxy");
  app.use((req, res, next) => {
    if (process.env.NODE_ENV != "development" && !req.secure) {
      return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
  });
} else {
  var io = new Server(httpServer);
  console.log("HTTPS server listening on port " + httpPort);
}

app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send("ok");
});

app.get("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (fs.existsSync(__dirname + "/static" + req.url)) {
    res.sendFile(__dirname + "/static" + req.url);
  } else if (fs.existsSync(__dirname + "/static" + req.url + ".html")) {
    res.sendFile(__dirname + "/static" + req.url + ".html");
  } else {
    res.redirect("/index.html");
  }
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
