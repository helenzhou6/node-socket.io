"use strict";

const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 5000;
const INDEX = "/client/build/index.html";

const app = express();

const server = app
  .use(express.static(path.join(__dirname, "client", "build")))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
