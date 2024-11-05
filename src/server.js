const express = require("express");
require("dotenv").config({ path: "./.env" });
const { configApp } = require("./config/configAppExpress.js");
const { api } = require("./api/api.js");
const { Connection } = require("./database/connection.js");
const { createServer } = require("http");
const SocketIo = require("./socketIo/socket.io.js");
const { configSocketIo } = require("./config/configSocketIo.js");

// Global variables
globalThis.connection = new Connection();
globalThis.connection.connect();
globalThis.captchaOfIpAddress = new Map();
globalThis.tokenOfUserId = new Map();
globalThis.socketOfUserId = new Map();


// Create app and config
const app = express();
configApp(app);

const httpServer = createServer(app);
const io = new SocketIo(httpServer, configSocketIo);
globalThis.io = io; // Global io


// Use API route
app.use("/api", api);

// Run the app
let PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log("httpServer is running on port:", PORT);
});
